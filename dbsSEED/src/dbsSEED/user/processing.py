def summary(credit_list, debit_list):
    credit = 0
    debit = 0
    for items in credit_list:
        credit += items.transaction_amount
    for items in debit_list:
        debit += items.transaction_amount
    return credit, debit


def breakdown(transaction_type, all_objs):
    type_percentage = {}
    for type in transaction_type:
        filter_objs = all_objs.filter(transaction_category=type)
        spending_sum = 0
        for objs in filter_objs:
            spending_sum += objs.transaction_amount
        type_percentage[type] = spending_sum
    print(type_percentage)
    return type_percentage





