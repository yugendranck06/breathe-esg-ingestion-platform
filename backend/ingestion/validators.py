def detect_suspicious(value):

    if value < 0:

        return True, 'Negative value'

    if value == 0:

        return True, 'Zero consumption'

    if value > 1000000:

        return True, 'Extremely high value'

    return False, ''