from django.db import models


class Company(models.Model):

    name = models.CharField(
        max_length=255
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class DataSource(models.Model):

    SOURCE_CHOICES = [

        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES
    )

    original_file_name = models.CharField(
        max_length=255
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.source_type


class EmissionRecord(models.Model):

    STATUS_CHOICES = [

        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
        ('SUSPICIOUS', 'SUSPICIOUS'),
    ]

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    category = models.CharField(
        max_length=255
    )

    scope = models.CharField(
        max_length=50
    )

    raw_unit = models.CharField(
        max_length=50
    )

    normalized_unit = models.CharField(
        max_length=50
    )

    raw_value = models.FloatField()

    normalized_value = models.FloatField()

    emissions_kg_co2e = models.FloatField(
        default=0
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    suspicious_reason = models.TextField(
        blank=True,
        null=True
    )

    raw_data = models.JSONField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.category


class AuditLog(models.Model):

    record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=255
    )

    changed_by = models.CharField(
        max_length=255
    )

    timestamp = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.action