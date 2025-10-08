import re
from typing import Dict, List, Optional, Tuple
from .logger import api_logger

class SafetyChecker:
    """Content safety checker for therapy conversations"""

    def __init__(self):
        self.logger = api_logger.getChild("SafetyChecker")
        
        # Crisis keywords and patterns
        self.CRISIS_PATTERNS = {
            "suicide": [
                r"\b(?:suicide|kill\s*(?:my)?self|end\s*(?:my)?\s*life)\b",
                r"\b(?:don't|do\s*not)\s*want\s*to\s*(?:live|be\s*alive)\b",
                r"\b(?:planning|planned)\s*(?:my)?\s*(?:death|suicide)\b"
            ],
            "self_harm": [
                r"\b(?:cut|harm|hurt)\s*(?:my)?self\b",
                r"\b(?:inflict|causing)\s*(?:pain|damage)\b",
                r"\bself[\s-]harm\b"
            ],
            "immediate_danger": [
                r"\b(?:going|about)\s*to\s*(?:kill|harm|hurt)\b",
                r"\b(?:right|ready)\s*now\b.*(?:suicide|kill|harm)\b",
                r"\b(?:have|got)\s*(?:the|a)?\s*(?:pills|weapon|knife|gun)\b"
            ]
        }
        
        # Crisis resources
        self.CRISIS_RESOURCES = {
            "US": {
                "name": "National Suicide Prevention Lifeline",
                "phone": "988",
                "text": "HOME to 741741",
                "website": "https://988lifeline.org/"
            },
            "UK": {
                "name": "Samaritans",
                "phone": "116 123",
                "website": "https://www.samaritans.org/"
            },
            "Global": {
                "name": "International Association for Suicide Prevention",
                "website": "https://www.iasp.info/resources/Crisis_Centres/"
            }
        }

    def check_content(self, text: str) -> Dict[str, any]:
        """
        Check content for safety concerns and crisis indicators
        
        Args:
            text: The text content to check
            
        Returns:
            Dict containing:
            - is_crisis: bool
            - crisis_type: Optional[str]
            - confidence: float
            - resources: List[Dict]
            - recommendations: List[str]
        """
        try:
            results = {
                "is_crisis": False,
                "crisis_type": None,
                "confidence": 0.0,
                "resources": [],
                "recommendations": []
            }
            
            # Check each pattern category
            for crisis_type, patterns in self.CRISIS_PATTERNS.items():
                matches = []
                for pattern in patterns:
                    if re.search(pattern, text.lower()):
                        matches.append(pattern)
                
                if matches:
                    results["is_crisis"] = True
                    results["crisis_type"] = crisis_type
                    results["confidence"] = min(1.0, len(matches) * 0.4)  # Scale confidence
                    break
            
            # Add resources and recommendations based on crisis type
            if results["is_crisis"]:
                results["resources"] = self._get_crisis_resources()
                results["recommendations"] = self._get_recommendations(results["crisis_type"])
                
                self.logger.warning(
                    f"Crisis content detected: {results['crisis_type']} "
                    f"(confidence: {results['confidence']:.2f})"
                )
            
            return results
            
        except Exception as e:
            self.logger.error(f"Error in check_content: {str(e)}")
            # Return safe default in case of error
            return {
                "is_crisis": False,
                "crisis_type": None,
                "confidence": 0.0,
                "resources": [],
                "recommendations": []
            }

    def _get_crisis_resources(self) -> List[Dict]:
        """Get relevant crisis resources"""
        return [resource for resource in self.CRISIS_RESOURCES.values()]

    def _get_recommendations(self, crisis_type: str) -> List[str]:
        """Get recommendations based on crisis type"""
        base_recommendations = [
            "Encourage seeking immediate professional help",
            "Provide crisis hotline numbers",
            "Do not leave the person alone if possible",
            "Take all mentions of suicide or self-harm seriously"
        ]
        
        specific_recommendations = {
            "suicide": [
                "Ask directly about suicide plans",
                "Remove access to lethal means if possible",
                "Contact emergency services if immediate risk",
                "Help create a safety plan"
            ],
            "self_harm": [
                "Discuss alternative coping strategies",
                "Recommend professional counseling",
                "Focus on harm reduction if needed",
                "Help identify triggers"
            ],
            "immediate_danger": [
                "Call emergency services immediately",
                "Stay on the line until help arrives",
                "Get location information if possible",
                "Alert trusted contacts/family members"
            ]
        }
        
        return base_recommendations + specific_recommendations.get(crisis_type, [])