# backend/ingestion/normalization.py


# =========================
# UNIT NORMALIZATION
# =========================

def normalize_unit(value, unit):

    unit = unit.lower()

    # Fuel conversions

    if unit == 'gallons':

        # Convert gallons to liters

        return round(value * 3.78541, 2), 'liters'

    elif unit == 'litres':

        return value, 'liters'

    elif unit == 'liters':

        return value, 'liters'

    # Electricity

    elif unit == 'kwh':

        return value, 'kwh'

    elif unit == 'mwh':

        return round(value * 1000, 2), 'kwh'

    # Travel distance

    elif unit == 'miles':

        return round(value * 1.60934, 2), 'km'

    elif unit == 'km':

        return value, 'km'

    # Default fallback

    return value, unit


# =========================
# EMISSION FACTORS
# =========================

EMISSION_FACTORS = {

    # Fuel

    'Diesel': 2.68,

    'Petrol': 2.31,

    # Electricity

    'Electricity': 0.82,

    # Travel

    'Flight': 0.15,

    'Hotel': 15,

    'Ground Transport': 0.09,
}


# =========================
# EMISSION CALCULATION
# =========================

def calculate_emissions(
    category,
    value,
    unit
):

    factor = EMISSION_FACTORS.get(
        category,
        0.5
    )

    emissions = value * factor

    return round(emissions, 2)