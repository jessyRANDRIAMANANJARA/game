import unittest
from unittest.mock import patch

from machine_game import VALID_CHOICES, determine_winner, machine_choice, play


class TestDetermineWinner(unittest.TestCase):
    def test_draw(self):
        self.assertEqual(determine_winner("rock", "rock"), "draw")

    def test_player_wins(self):
        self.assertEqual(determine_winner("paper", "rock"), "player")
        self.assertEqual(determine_winner("rock", "scissors"), "player")
        self.assertEqual(determine_winner("scissors", "paper"), "player")

    def test_machine_wins(self):
        self.assertEqual(determine_winner("scissors", "rock"), "machine")

    def test_invalid_player_choice(self):
        with self.assertRaises(ValueError):
            determine_winner("lizard", "rock")

    def test_invalid_machine_choice(self):
        with self.assertRaises(ValueError):
            determine_winner("rock", "lizard")


class TestGameplay(unittest.TestCase):
    def test_machine_choice_is_valid(self):
        for _ in range(50):
            self.assertIn(machine_choice(), VALID_CHOICES)

    def test_play_prints_machine_win(self):
        with patch("builtins.input", return_value="scissors"), patch(
            "machine_game.machine_choice", return_value="rock"
        ), patch("builtins.print") as mock_print:
            play()

        mock_print.assert_any_call("Machine chose: rock")
        mock_print.assert_any_call("Result: machine wins")


if __name__ == "__main__":
    unittest.main()
