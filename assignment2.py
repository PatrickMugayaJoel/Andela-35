
""" question 0 """
def grader(marks):
    """Grading function"""

    for mark in marks:
        if 100 >= mark >= 90:
            print(f'{mark}: Excellent')
        elif 89 >= mark >= 70:
            print(f'{mark}: Very good')
        elif 69 >= mark >= 60:
            print(f'{mark}: Good')
        elif 59 >= mark >= 40:
            print(f'{mark}: Poor')
        elif 39 >= mark >= 20:
            print(f'{mark}: Very poor')
        else:
            print(f'{mark}: Repeat')

""" question 0 """
def gradingsystem():
    """Grading system"""

    marks_list = [23, 4, 5, 6, 64, 90, 67, 98, 45, 23, 67, 78, 89]
    above50, below50 = [], []

    for mark in marks_list:
        if mark > 50:
            above50.append(mark)
        else:
            below50.append(mark)

    print('\n=>Marks above 50')
    grader(above50)

    print('\n=>Marks below 50')
    grader(below50)


""" question 1 """
def multiplesof75():  
    """ In a range print numbers that are multiples of 7 but not multiples of 5 """

    for number in range(2000, 3201):
        if number % 7 == 0 and number % 5 != 0:
            print(number)


""" question 2 """
def sentences():
    """ capitalize a list of sentences """

    sentences_count = int(input('How many sentences do you wish to add?'))
    print(f"Please add the {sentences_count} sentences")
    sentences = [input().upper() for sentence in range(sentences_count)]
    print('\n')
    for sentence in sentences:
        print(sentence)

""" question 3 """
def multipleof5inbinarylist():
    """ return multiples of 5 in a binary string """
    binarys = input('Add a sequence of comma separated 4 digit binary numbers:\n')
    decimalslist = [int(binary, 2) for binary in binarys.split(',')]
    for decimal in decimalslist:
        if decimal % 5 == 0:
            return bin(decimal)[2:]

def banknetammount():
    inputs_count = int(input('Enter number of transactions in the log: '))
    account_total = 0
    print("Enter log values:")
    for num in range(inputs_count):
        num = input().split()
        if num[0] == 'D':
            account_total += int(num[1])
        else:
            account_total -= int(num[1])

    return account_total

def printsquares():
    squares = [x ** 2 for x in range(1, 21)]
    for square in squares[:5]:
        print(square)

if __name__ == '__main__':
    "Run python assignment2.py"

    "question 0"
    #gradingsystem()

    "question 1"
    #print(multiplesof75())

    "question 2"
    #sentences()

    "question 3"
    #print(multipleof5inbinarylist())

    "question 4"
    #print(banknetammount())

    "question 5"
    #print(printsquares())
