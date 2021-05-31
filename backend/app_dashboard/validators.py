from django.core.exceptions import ValidationError 
import re, datetime
def validate_alphanumeric(value):
    reg = re.compile("^[a-zA-Z0-9 .,-_ñ]*$")
    if not reg.match(value):
        raise ValidationError("Invalid Input, Please Try Again")

def validate_phone(value):
    reg = re.compile("^[0-9-]*$")
    if not reg.match(value):
        raise ValidationError("This field should only contain numbers (e.g. 09166554451)")

def validate_money(value):
    reg = re.compile("^[0-9.]*$")
    if not reg.match(value):
        raise ValidationError("This field should only contain numbers and/or decimal point  (e.g. 130500.00)")

def validate_date(value):
    format = "%Y-%m-d"
    try:
        datetime.datetime.strptime(date_string, format)
    except ValueError:
        raise ValidationError("Invalid Date, Please Try Again")

def check_empty(value):
    if value in [None, '']:
        return True
    else:
        return False
