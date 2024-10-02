import unittest
from calculator1 import addition, subtraction, multiplication, division
def addition(a, b):
    return a + b

def subtraction(a, b):
    return a - b

def division(a, b):
    if b != 0 and a != 0:
        return a / b
    else:
        return "Ошибка: Деление на ноль"

def multiplication(a, b):
    return a * b
   

class TestMathOperations(unittest.TestCase):

    def test_addition(self):
        self.assertEqual(addition(1, 2), 3)
        self.assertEqual(addition(-1, 1), 0)
        self.assertEqual(addition(-1, -1), -2)

    def test_subtraction(self):
        self.assertEqual(subtraction(5, 3), 2)
        self.assertEqual(subtraction(0, 5), -5)
        self.assertEqual(subtraction(-1, -1), 0)

    def test_multiplication(self):
        self.assertEqual(multiplication(3, 2), 6)
        self.assertEqual(multiplication(-1, 1), -1)
        self.assertEqual(multiplication(-1, -1), 1)
        
    def test_division(self):
        self.assertEqual(division(6, 3), 2)
        self.assertEqual(division(5, 2), 2.5)
        self.assertEqual(division(5, 0), "Ошибка: Деление на ноль")

if __name__ == '__main__':
    unittest.main()
