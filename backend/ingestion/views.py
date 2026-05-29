
# # backend/ingestion/views.py

# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# from .parsers import (
#     parse_sap,
#     parse_utility,
#     parse_travel
# )

# from .models import (
#     Company,
#     DataSource,
#     EmissionRecord,
#     AuditLog
# )

# from .serializers import (
#     EmissionRecordSerializer
# )

# from .normalization import (
#     normalize_unit,
#     calculate_emissions
# )

# from .validators import detect_suspicious


# # ==========================================
# # Upload ESG CSV
# # ==========================================

# @api_view(['POST'])
# def upload_csv(request):

#     try:

#         file = request.FILES.get('file')
#         source_type = request.data.get('source_type')

#         if not file:
#             return Response({
#                 'error': 'No file uploaded'
#             }, status=400)

#         if not source_type:
#             return Response({
#                 'error': 'Source type missing'
#             }, status=400)

#         # Create company

#         company, _ = Company.objects.get_or_create(
#             name='Demo Company'
#         )

#         # Create source tracking

#         source = DataSource.objects.create(
#             company=company,
#             source_type=source_type,
#             original_file_name=file.name
#         )

#         # Parse CSV

#         if source_type == 'SAP':

#             df = parse_sap(file)

#         elif source_type == 'UTILITY':

#             df = parse_utility(file)

#         elif source_type == 'TRAVEL':

#             df = parse_travel(file)

#         else:

#             return Response({
#                 'error': 'Invalid source type'
#             }, status=400)

#         created = 0
#         suspicious_count = 0

#         for _, row in df.iterrows():

#             try:

#                 raw_value = float(row['value'])

#                 raw_unit = row['unit']

#                 normalized_value, normalized_unit = normalize_unit(
#                     raw_value,
#                     raw_unit
#                 )

#                 suspicious, reason = detect_suspicious(
#                     normalized_value
#                 )

#                 status = (
#                     'SUSPICIOUS'
#                     if suspicious
#                     else 'PENDING'
#                 )

#                 if suspicious:
#                     suspicious_count += 1

#                 emissions = calculate_emissions(
#                     row['category'],
#                     normalized_value,
#                     normalized_unit
#                 )

#                 EmissionRecord.objects.create(

#                     source=source,

#                     category=row['category'],

#                     scope=row['scope'],

#                     raw_unit=raw_unit,

#                     normalized_unit=normalized_unit,

#                     raw_value=raw_value,

#                     normalized_value=normalized_value,

#                     emissions_kg_co2e=emissions,

#                     status=status,

#                     suspicious_reason=reason,

#                     raw_data=row.to_dict()
#                 )

#                 created += 1

#             except Exception as row_error:

#                 print("Row Error:", row_error)

#                 continue

#         return Response({

#             'message': 'Upload successful',

#             'records_created': created,

#             'suspicious_records': suspicious_count

#         })

#     except Exception as e:

#         return Response({

#             'error': str(e)

#         }, status=500)


# # ==========================================
# # Dashboard Metrics
# # ==========================================

# @api_view(['GET'])
# def dashboard_metrics(request):

#     total = EmissionRecord.objects.count()

#     pending = EmissionRecord.objects.filter(
#         status='PENDING'
#     ).count()

#     approved = EmissionRecord.objects.filter(
#         status='APPROVED'
#     ).count()

#     rejected = EmissionRecord.objects.filter(
#         status='REJECTED'
#     ).count()

#     suspicious = EmissionRecord.objects.filter(
#         status='SUSPICIOUS'
#     ).count()

#     return Response({

#         'total': total,

#         'pending': pending,

#         'approved': approved,

#         'rejected': rejected,

#         'suspicious': suspicious

#     })


# # ==========================================
# # Get Records
# # ==========================================

# @api_view(['GET'])
# def get_records(request):

#     records = EmissionRecord.objects.all().order_by(
#         '-created_at'
#     )

#     serializer = EmissionRecordSerializer(
#         records,
#         many=True
#     )

#     return Response(serializer.data)


# # ==========================================
# # Approve Record
# # ==========================================

# @api_view(['POST'])
# def approve_record(request, pk):

#     try:

#         record = EmissionRecord.objects.get(id=pk)

#         record.status = 'APPROVED'

#         record.save()

#         AuditLog.objects.create(

#             record=record,

#             action='Approved',

#             changed_by='Analyst'
#         )

#         return Response({
#             'message': 'Approved'
#         })

#     except EmissionRecord.DoesNotExist:

#         return Response({
#             'error': 'Record not found'
#         }, status=404)


# # ==========================================
# # Reject Record
# # ==========================================

# @api_view(['POST'])
# def reject_record(request, pk):

#     try:

#         record = EmissionRecord.objects.get(id=pk)

#         record.status = 'REJECTED'

#         record.save()

#         AuditLog.objects.create(

#             record=record,

#             action='Rejected',

#             changed_by='Analyst'
#         )

#         return Response({
#             'message': 'Rejected'
#         })

#     except EmissionRecord.DoesNotExist:

#         return Response({
#             'error': 'Record not found'
#         }, status=404)


# # ==========================================
# # Audit Logs
# # ==========================================

# @api_view(['GET'])
# def audit_logs(request):

#     logs = AuditLog.objects.all().order_by(
#         '-timestamp'
#     )

#     data = []

#     for log in logs:

#         data.append({

#             'record': log.record.id,

#             'action': log.action,

#             'changed_by': log.changed_by,

#             'timestamp': log.timestamp

#         })

#     return Response(data)


# backend/ingestion/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .parsers import (
    parse_sap,
    parse_utility,
    parse_travel
)

from .models import (
    Company,
    DataSource,
    EmissionRecord,
    AuditLog
)

from .serializers import (
    EmissionRecordSerializer
)

from .normalization import (
    normalize_unit,
    calculate_emissions
)

from .validators import detect_suspicious


# ==========================================
# Upload ESG CSV
# ==========================================

@api_view(['POST'])
def upload_csv(request):

    try:

        file = request.FILES.get('file')

        source_type = request.data.get(
            'source_type'
        )

        if not file:

            return Response({
                'error': 'No file uploaded'
            }, status=400)

        if not source_type:

            return Response({
                'error': 'Source type missing'
            }, status=400)

        # Create Company

        company, _ = Company.objects.get_or_create(
            name='Demo Company'
        )

        # Create Data Source

        source = DataSource.objects.create(
            company=company,
            source_type=source_type,
            original_file_name=file.name
        )

        # Parse CSV

        if source_type == 'SAP':

            df = parse_sap(file)

        elif source_type == 'UTILITY':

            df = parse_utility(file)

        elif source_type == 'TRAVEL':

            df = parse_travel(file)

        else:

            return Response({
                'error': 'Invalid source type'
            }, status=400)

        created = 0

        suspicious_count = 0

        # Process Rows

        for _, row in df.iterrows():

            try:

                # Safe Data Extraction

                raw_value = float(
                    row.get('value', 0)
                )

                raw_unit = str(
                    row.get('unit', 'kwh')
                )

                category = str(
                    row.get(
                        'category',
                        'Unknown'
                    )
                )

                scope = str(
                    row.get(
                        'scope',
                        'Scope 1'
                    )
                )

                # Normalize Units

                normalized_value, normalized_unit = normalize_unit(
                    raw_value,
                    raw_unit
                )

                # Detect Suspicious

                suspicious, reason = detect_suspicious(
                    normalized_value
                )

                status = (
                    'SUSPICIOUS'
                    if suspicious
                    else 'PENDING'
                )

                if suspicious:

                    suspicious_count += 1

                # Calculate Emissions

                emissions = calculate_emissions(
                    category,
                    normalized_value,
                    normalized_unit
                )

                # Save Record

                EmissionRecord.objects.create(

                    source=source,

                    category=category,

                    scope=scope,

                    raw_unit=raw_unit,

                    normalized_unit=normalized_unit,

                    raw_value=raw_value,

                    normalized_value=normalized_value,

                    emissions_kg_co2e=emissions,

                    status=status,

                    suspicious_reason=reason,

                    raw_data=row.to_dict()
                )

                created += 1

            except Exception as row_error:

                print(
                    "Row Error:",
                    row_error
                )

                continue

        return Response({

            'message': 'Upload successful',

            'records_created': created,

            'suspicious_records': suspicious_count

        })

    except Exception as e:

        print("Upload Error:", e)

        return Response({

            'error': str(e)

        }, status=500)


# ==========================================
# Dashboard Metrics
# ==========================================

@api_view(['GET'])
def dashboard_metrics(request):

    total = EmissionRecord.objects.count()

    pending = EmissionRecord.objects.filter(
        status='PENDING'
    ).count()

    approved = EmissionRecord.objects.filter(
        status='APPROVED'
    ).count()

    rejected = EmissionRecord.objects.filter(
        status='REJECTED'
    ).count()

    suspicious = EmissionRecord.objects.filter(
        status='SUSPICIOUS'
    ).count()

    return Response({

        'total': total,

        'pending': pending,

        'approved': approved,

        'rejected': rejected,

        'suspicious': suspicious

    })


# ==========================================
# Get All Records
# ==========================================

@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all().order_by(
        '-created_at'
    )

    serializer = EmissionRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)


# ==========================================
# Approve Record
# ==========================================

@api_view(['POST'])
def approve_record(request, pk):

    try:

        record = EmissionRecord.objects.get(
            id=pk
        )

        record.status = 'APPROVED'

        record.save()

        AuditLog.objects.create(

            record=record,

            action='Approved',

            changed_by='Analyst'
        )

        return Response({
            'message': 'Approved'
        })

    except EmissionRecord.DoesNotExist:

        return Response({
            'error': 'Record not found'
        }, status=404)


# ==========================================
# Reject Record
# ==========================================

@api_view(['POST'])
def reject_record(request, pk):

    try:

        record = EmissionRecord.objects.get(
            id=pk
        )

        record.status = 'REJECTED'

        record.save()

        AuditLog.objects.create(

            record=record,

            action='Rejected',

            changed_by='Analyst'
        )

        return Response({
            'message': 'Rejected'
        })

    except EmissionRecord.DoesNotExist:

        return Response({
            'error': 'Record not found'
        }, status=404)


# ==========================================
# Audit Logs
# ==========================================

@api_view(['GET'])
def audit_logs(request):

    logs = AuditLog.objects.all().order_by(
        '-timestamp'
    )

    data = []

    for log in logs:

        data.append({

            'record': log.record.id,

            'action': log.action,

            'changed_by': log.changed_by,

            'timestamp': log.timestamp

        })

    return Response(data)