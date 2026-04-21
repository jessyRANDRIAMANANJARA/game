import unittest

from machine_game import determine_winner


class TestDetermineWinner(unittest.TestCase):
    def test_draw(self):
        self.assertEqual(determine_winner("rock", "rock"), "draw")

    def test_player_wins(self):
        self.assertEqual(determine_winner("paper", "rock"), "player")

    def test_machine_wins(self):
        self.assertEqual(determine_winner("scissors", "rock"), "machine")

    def test_invalid_player_choice(self):
        with self.assertRaises(ValueError):
            determine_winner("lizard", "rock")

    def test_invalid_machine_choice(self):
        with self.assertRaises(ValueError):
            determine_winner("rock", "lizard")


if __name__ == "__main__":
    unittest.main()
