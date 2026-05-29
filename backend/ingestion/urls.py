from django.urls import path

from .views import (
    upload_csv,
    dashboard_metrics,
    get_records,
    approve_record,
    reject_record,
    audit_logs
)

urlpatterns = [

    path(
        'upload/',
        upload_csv
    ),

    path(
        'dashboard-metrics/',
        dashboard_metrics
    ),

    path(
        'records/',
        get_records
    ),

    path(
        'approve/<int:pk>/',
        approve_record
    ),

    path(
        'reject/<int:pk>/',
        reject_record
    ),

    path(
        'audit-logs/',
        audit_logs
    ),
]