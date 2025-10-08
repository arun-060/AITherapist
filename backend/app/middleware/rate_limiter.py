import time
from typing import Dict, Optional, Tuple
from fastapi import Request, HTTPException
from threading import Lock

class RateLimiter:
    """Rate limiting middleware for FastAPI"""

    def __init__(
        self,
        requests_per_minute: int = 60,
        burst_limit: Optional[int] = None
    ):
        self.requests_per_minute = requests_per_minute
        self.burst_limit = burst_limit or requests_per_minute * 2
        self.requests: Dict[str, list] = {}  # IP -> list of timestamps
        self._lock = Lock()

    def _clean_old_requests(self, ip: str) -> None:
        """Remove requests older than 1 minute"""
        now = time.time()
        with self._lock:
            if ip in self.requests:
                self.requests[ip] = [ts for ts in self.requests[ip] if now - ts < 60]

    def _get_requests_count(self, ip: str) -> Tuple[int, int]:
        """Get current request counts for normal and burst windows"""
        now = time.time()
        timestamps = self.requests.get(ip, [])
        
        # Count requests in last minute (normal window)
        normal_count = sum(1 for ts in timestamps if now - ts < 60)
        
        # Count requests in last 10 seconds (burst window)
        burst_count = sum(1 for ts in timestamps if now - ts < 10)
        
        return normal_count, burst_count

    async def __call__(self, request: Request, call_next):
        """Rate limiting middleware implementation"""
        # Get client IP
        ip = request.client.host if request.client else "unknown"
        
        # Clean old requests
        self._clean_old_requests(ip)
        
        # Get current counts
        normal_count, burst_count = self._get_requests_count(ip)
        
        # Check limits
        if normal_count >= self.requests_per_minute:
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again in a minute."
            )
            
        if burst_count >= self.burst_limit // 6:  # Burst limit for 10-second window
            raise HTTPException(
                status_code=429,
                detail="Request burst limit exceeded. Please slow down."
            )
        
        # Add new request timestamp
        with self._lock:
            if ip not in self.requests:
                self.requests[ip] = []
            self.requests[ip].append(time.time())
        
        # Process the request
        return await call_next(request)