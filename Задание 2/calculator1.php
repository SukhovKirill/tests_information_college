def addition(a, b):
    return a + b

def subtraction(a, b):
    return a - b

def multiplication(a, b):
    return a * b

def division(a, b):
    if b != 0:
        return a / b
    else:
        return "Ошибка: Деление на ноль"

q1 = int(input('Введите число 1: '))
q2 = int(input('Введите число 2: '))

v = int(input('Какую операцию вы хотите выполнить? \n 1 Сложение \n 2 Вычитание \n 3 Деление \n 4 Умножение \n'))

if v == 1:
    r = addition(q1, q2)
    operation = 'сложения'
elif v == 2:
    r = subtraction(q1, q2)
    operation = 'вычитания'
elif v == 3:
    r = division(q1, q2)
    operation = 'деления'
elif v == 4:
    r = multiplication(q1, q2)
    operation = 'умножения'
else:
    r = "Ошибка: Неверный выбор операции"
    operation = ""

if operation:
    print('Результат ', operation, ' = ', r)
else:
    print(r)
