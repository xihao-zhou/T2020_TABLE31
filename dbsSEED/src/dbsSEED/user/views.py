from django.shortcuts import render
import requests
from datetime import datetime
from database.models import UserData, UserSummary
import matplotlib.pyplot as plt
from .processing import summary, breakdown
from .config import api_key

# Create your views here.


def user_data_view(request, id):
    user = {1: "limzeyang", 2: "marytan", 3: "ahmadfarhan"}
    headers = {
        "Identity": "T52",
        "Token": api_key
    }
    #GET USER ID
    URL_get_id = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/"+user[id]
    response = requests.get(URL_get_id, headers=headers)
    parsed_data_id = response.json()
    print("User id: {}".format(parsed_data_id))
    user_id = str(parsed_data_id["customerId"])

    #GET USER DETAILS
    URL_get_details = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/"+ user_id +"/details"
    response = requests.get(URL_get_details, headers=headers)
    parsed_data_details = response.json()
    print("User details: {}".format(parsed_data_details))
    name = parsed_data_details["lastName"] + parsed_data_details["firstName"]
    last_login = parsed_data_details["lastLogIn"]
    risk_level = parsed_data_details["riskLevel"]

    #GET USER ACCOUNTS
    URL_accounts = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/"+user_id
    response = requests.get(URL_accounts, headers=headers)
    parsed_data_accounts = response.json()
    user_account_id = str(parsed_data_accounts[0]["accountId"])
    print("User accounts: {}".format(parsed_data_accounts))

    #GET USER TRANSACTION
    URL_get_transaction = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/"+user_account_id+"?"
    start_date = "01-01-2018"
    end_date = "01-30-2020"
    params = {
        "from": start_date,
        "to": end_date
    }
    response = requests.get(URL_get_transaction, headers=headers, params=params)
    parsed_data_transaction = response.json()
    print("First transaction details: {}".format(parsed_data_transaction[0]))

    context = {
        "id": user_id,
        "name": name,
        "account_id": user_account_id,
        "risk_level": risk_level
    }
    transaction_type = []
    for transaction in parsed_data_transaction:
        if transaction["tag"] not in transaction_type:
            transaction_type.append(transaction["tag"])
        if transaction["type"] == "CREDIT":
            transaction_amount = float(transaction["amount"])
        else:
            transaction_amount = -float(transaction["amount"])
        transaction_date = transaction["date"][:10]
        if not UserData.objects.filter(transaction_id=transaction["transactionId"]).exists():
            user = UserData(name=name, account_id=user_account_id, transaction_id=transaction["transactionId"],
                            transaction_amount=transaction_amount, transaction_date=transaction_date,
                            transaction_type=transaction["type"],
                            transaction_category=transaction["tag"])
            user.save()

    credit_list = UserData.objects.filter(transaction_type="CREDIT")
    debit_list = UserData.objects.filter(transaction_type="DEBIT")
    all_objs = UserData.objects.all()
    summary_name = name+"_summary"
    credit, debit = summary(credit_list, debit_list)
    results = breakdown(transaction_type, all_objs)
    if not UserSummary.objects.filter(name=summary_name).exists():
        print("ADD SUMMARY")
        user_summary = UserSummary(name=summary_name, credit=credit, debit=debit, breakdown=results)
        user_summary.save()
    else:
        print("DELETE THEN ADD SUMMARY")
        user_summary = UserSummary.objects.get(name=summary_name)
        user_summary.delete()
        user_summary = UserSummary(name=summary_name, credit=credit, debit=debit, breakdown=results)
        user_summary.save()

    return render(request, "user_get_data.html", context)
