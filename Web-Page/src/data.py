from typing import List, Dict, Tuple
from dataclasses import dataclass
from datetime import datetime

@dataclass
class TripData:
    """Data structure to hold trip information"""
    total_run_time: float # Total trip duration in seconds
    looking_away_times: List[float]
    asleep_times: List[float]
    distracted_times: List[float]
    tired_times: List[float]
    trip_id: str
    trip_date: datetime
    driver_id: str

@dataclass
class TripInfo:
    """Basic trip information"""
    trip_id: str  # NEW: Add trip_id here too
    total_duration_minutes: float
    trip_date: str
    driver_id: str
    trip_data: TripData

@dataclass
class BehaviorStatistics:
    """Statistics for a specific behavior type"""
    count: int = 0
    total_duration: float = 0.0
    mean_duration: float = 0.0
    median_duration: float = 0.0
    std_duration: float = 0.0
    min_duration: float = 0.0
    max_duration: float = 0.0
    percentile_75: float = 0.0
    percentile_90: float = 0.0
    percentile_95: float = 0.0
    trip_percentage: float = 0.0
    frequency_per_hour: float = 0.0
    
    
@dataclass
class SafetyScoreResult:
    """Safety scoring results"""
    overall_safety_score: float
    duration_score: float
    frequency_score: float
    severity_score: float
    safety_category: str


class CriticalEvents:
    """Critical safety events detected during trip"""
    critical_asleep: List[float]
    critical_looking_away: List[float]
    critical_distraction: List[float]
    critical_exhaustion: List[float]
    
    def __init__(self):
        self.critical_asleep = []
        self.critical_looking_away = []
        self.critical_distraction = []
        self.critical_exhaustion = []
        

class BasicStatistics:
    """Container for all behavior statistics"""
    def __init__(self):
        self.looking_away = BehaviorStatistics()
        self.asleep = BehaviorStatistics()
        self.distracted = BehaviorStatistics()
        self.tired = BehaviorStatistics()
    
    def get_behavior_stats(self, behavior_name: str) -> BehaviorStatistics:
        """Get statistics for a specific behavior"""
        return getattr(self, behavior_name)
    
    def set_behavior_stats(self, behavior_name: str, stats: BehaviorStatistics):
        """Set statistics for a specific behavior"""
        setattr(self, behavior_name, stats)
        
@dataclass
class RiskAnalysis:
    """Risk pattern analysis results"""
    total_unsafe_time: float
    unsafe_percentage: float
    total_events: int
    risk_trend: str
    risk_level: str
    
  
@dataclass
class ComprehensiveReport:
    """Complete analysis report"""
    trip_info: TripInfo
    basic_statistics: BasicStatistics
    safety_assessment: SafetyScoreResult
    critical_events: CriticalEvents
    risk_analysis: RiskAnalysis