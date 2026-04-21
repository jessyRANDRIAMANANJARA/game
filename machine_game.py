import random

VALID_CHOICES = ("rock", "paper", "scissors")


def determine_winner(player_choice: str, machine_choice: str) -> str:
    player = player_choice.lower().strip()
    machine = machine_choice.lower().strip()

    if player not in VALID_CHOICES:
        raise ValueError(f"Invalid player choice: {player_choice}")
    if machine not in VALID_CHOICES:
        raise ValueError(f"Invalid machine choice: {machine_choice}")

    if player == machine:
        return "draw"

    winning_pairs = {
        ("rock", "scissors"),
        ("paper", "rock"),
        ("scissors", "paper"),
    }
    return "player" if (player, machine) in winning_pairs else "machine"


def machine_choice() -> str:
    return random.choice(VALID_CHOICES)


def play() -> None:
    player = input("Choose rock, paper, or scissors: ").strip().lower()
    machine = machine_choice()
    try:
        result = determine_winner(player, machine)
    except ValueError:
        print(f"Invalid choice: {player}. Please choose rock, paper, or scissors.")
        return

    print(f"Machine chose: {machine}")

    if result == "draw":
        print("Result: draw")
    elif result == "player":
        print("Result: you win")
    else:
        print("Result: machine wins")


if __name__ == "__main__":
    play()
