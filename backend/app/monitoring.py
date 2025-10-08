import time
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Optional
from threading import Lock
import psutil

from .utils.logger import api_logger

@dataclass
class RequestMetrics:
    """Metrics for API requests"""
    endpoint: str
    method: str
    status_code: int
    response_time: float
    timestamp: datetime = field(default_factory=datetime.now)
    error: Optional[str] = None

@dataclass
class TokenMetrics:
    """Metrics for token usage"""
    endpoint: str
    input_tokens: int
    output_tokens: int
    timestamp: datetime = field(default_factory=datetime.now)
    cost: Optional[float] = None

class MetricsCollector:
    """Collects and manages application metrics"""

    def __init__(self):
        self.logger = api_logger.getChild("MetricsCollector")
        self._lock = Lock()
        
        # Metrics storage
        self.request_metrics: List[RequestMetrics] = []
        self.token_metrics: List[TokenMetrics] = []
        self.error_counts: Dict[str, int] = {}
        
        # Performance tracking
        self.start_time = time.time()
        self.total_requests = 0
        self.total_errors = 0

    def add_request_metric(
        self,
        endpoint: str,
        method: str,
        status_code: int,
        response_time: float,
        error: Optional[str] = None
    ) -> None:
        """Add metrics for an API request"""
        metric = RequestMetrics(
            endpoint=endpoint,
            method=method,
            status_code=status_code,
            response_time=response_time,
            error=error
        )
        
        with self._lock:
            self.request_metrics.append(metric)
            self.total_requests += 1
            
            if status_code >= 400:
                self.total_errors += 1
                error_key = f"{status_code}:{endpoint}"
                self.error_counts[error_key] = self.error_counts.get(error_key, 0) + 1

    def add_token_metric(
        self,
        endpoint: str,
        input_tokens: int,
        output_tokens: int,
        cost: Optional[float] = None
    ) -> None:
        """Add metrics for token usage"""
        metric = TokenMetrics(
            endpoint=endpoint,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            cost=cost
        )
        
        with self._lock:
            self.token_metrics.append(metric)

    def get_system_metrics(self) -> Dict:
        """Get current system performance metrics"""
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            return {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "memory_available": memory.available,
                "disk_percent": disk.percent,
                "disk_free": disk.free
            }
        except Exception as e:
            self.logger.error(f"Error getting system metrics: {str(e)}")
            return {}

    def get_api_metrics(self) -> Dict:
        """Get API performance metrics"""
        with self._lock:
            total_response_time = sum(m.response_time for m in self.request_metrics)
            avg_response_time = total_response_time / len(self.request_metrics) if self.request_metrics else 0
            
            # Calculate success rate
            success_count = sum(1 for m in self.request_metrics if m.status_code < 400)
            success_rate = (success_count / len(self.request_metrics) * 100) if self.request_metrics else 100
            
            return {
                "total_requests": self.total_requests,
                "total_errors": self.total_errors,
                "average_response_time": avg_response_time,
                "success_rate": success_rate,
                "uptime_seconds": time.time() - self.start_time
            }

    def get_token_usage_metrics(self) -> Dict:
        """Get token usage metrics"""
        with self._lock:
            total_input_tokens = sum(m.input_tokens for m in self.token_metrics)
            total_output_tokens = sum(m.output_tokens for m in self.token_metrics)
            total_cost = sum(m.cost for m in self.token_metrics if m.cost is not None)
            
            return {
                "total_input_tokens": total_input_tokens,
                "total_output_tokens": total_output_tokens,
                "total_tokens": total_input_tokens + total_output_tokens,
                "estimated_cost": total_cost
            }

    def get_error_metrics(self) -> Dict:
        """Get error metrics"""
        with self._lock:
            return {
                "error_counts": self.error_counts,
                "total_errors": self.total_errors,
                "error_rate": (self.total_errors / self.total_requests * 100) if self.total_requests else 0
            }

    def cleanup_old_metrics(self, max_age_hours: int = 24) -> None:
        """Remove metrics older than specified hours"""
        cutoff_time = datetime.now()
        
        with self._lock:
            self.request_metrics = [
                m for m in self.request_metrics
                if (cutoff_time - m.timestamp).total_seconds() < max_age_hours * 3600
            ]
            
            self.token_metrics = [
                m for m in self.token_metrics
                if (cutoff_time - m.timestamp).total_seconds() < max_age_hours * 3600
            ]

# Global metrics collector instance
metrics_collector = MetricsCollector()