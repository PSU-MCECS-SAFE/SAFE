import os, sys, json

"""
This python script is utilized in the `npm run deployment` script you can find
in `package.json`. This generates a .ts file that is used in the build phase
then promptly deleted once `npm run deployment` has reached its final stage
to ensure that the secrets entered are never leaked.
"""


# helper functions
def print_info(username, password, db_address, db_name, rcvr_email):
    print("Username: " + username)
    print("Password: " + password)
    print("Database address: " + db_address)
    print("Database name: " + db_name)
    print("Receiver email: " + rcvr_email)


def clearScreen():
    return os.system("cls" if os.name == "nt" else "clear")


# main
def main():
    CFGPATH = "../safeConfig/safeConfig.json"
    path_exists = os.path.exists(CFGPATH)
    clearScreen()

    print(
        "Welcome to SAFE (System for Anonymous Feedback) "
        "configuration setup.\n\n"
        "This will guide you through setting up your connection to a\n"
        "specific database."
        "\n\n**NOTICE** -- You must already have PostgresSQL database setup\n"
        "and accessible with a username and password before continuing."
    )

    # If this path/file exist then ensure they want to override the information
    if path_exists:
        print(
            "\n**ALERT**: Database configuration already exists!"
            "\nCurrent configuration information: \n"
        )
        with open(CFGPATH, "r") as openfile:
            # Load parses json file to a string, loads takes the string
            # (hence load w/ an s) and puts/returns a dictionary with
            # correct id values.
            curcfg = json.load(openfile)
            print_info(
                curcfg["username"],
                curcfg["password"],
                curcfg["db_address"],
                curcfg["db_name"],
                curcfg["rcvr_email"],
            )

        conf = input(
            "\n**ALERT**: Would you like to reconfigure your settings? (Y/N): "
        )

        if conf.lower() == "n":
            print("\n\nKeeping current configuration...\n\n")
            sys.exit()

    print("\n\nGenerating new configuration file...")
    # Prompt the user for their database credentials
    while True:
        username = input("Enter the username: ")

        password = input("\nEnter the password: ")

        db_address = input("\nEnter the endpoint address: ")

        db_name = input("\nEnter the database name: ")

        rcvr_email = input("\nEnter the receiver email: ")

        print_info(username, password, db_address, db_name, rcvr_email)

        conf = input("\nIs this correct? (Y/N): ")
        if conf.lower() == "y":
            break
        clearScreen()
        print("\nPlease enter the corrected information...")

    # Create the directory/JSON file
    if not path_exists:
        os.makedirs(os.path.dirname(CFGPATH), exist_ok=True)

    # Make a quick dictionary to dump w/ JSON
    config_info = {
        "username": username,
        "password": password,
        "db_address": db_address,
        "db_name": db_name,
        "rcvr_email": rcvr_email,
    }

    with open(CFGPATH, "w") as outfile:
        outfile.write(json.dumps(config_info, indent=4))

    print("\n\n!!!File created!!!")


if __name__ == "__main__":
    main()
