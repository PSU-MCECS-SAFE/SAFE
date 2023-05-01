import os
import json
import shutil
import subprocess
import sys
import time
import re


def isDebugPresent():
    """
    Detects if the command line had any additional args and if they were the
    debug arg.

    ### Return:
    True if debug arg detected, false otherwise
    """
    if len(sys.argv) == 2 and (sys.argv[1] == "-d" or sys.argv[1] == "-D"):
        return True
    return False


""" This is not a docstring, no. This is a tribute!

This python script is utilized in the `npm run deployment` script you can find
in `package.json`. This generates a .ts file that is used in the build phase
then promptly deleted once `npm run deployment` has reached its final stage
to ensure that the secrets entered are never leaked.

There are a lot of time.sleep(x) present to allow the user to get the sensation
work is being done. It's also nice to read the messages left for you to ensure
nothing wild is happening.
"""

__OS_NAME = os.name
__CFG_PATH = "../safeConfig/safeConfig.json"
__BUILD_PATH = "./build"
__JSOUT_PATH = "./JSoutFile"
__CFG_EXISTS = os.path.exists(__CFG_PATH)
__BUILD_EXISTS = os.path.exists(__BUILD_PATH)
__JSOUT_EXISTS = os.path.exists(__JSOUT_PATH)
__DEBUG = isDebugPresent()


def print_info(username, password, db_address, db_name, rcvr_email):
    """
    Prints the config information if file has been found.
    """
    print("Username: " + username)
    print("Password: " + password)
    print("Database address: " + db_address)
    print("Database name: " + db_name)
    print("Receiver email: " + rcvr_email)


def clearScreen():
    """
    Clears the terminal screen at specific instances
    ### Return:
    A function for the os to clear the terminal depending on its type.
    """
    if not __DEBUG:
        return os.system("cls" if __OS_NAME == "nt" else "clear")
    return


def whoIsMyHost():
    """
    If the host is not ada.cs.pdx.edu, babbage.cs.pdx.edu or quizor*.pdx.edu
    and the debug argument is not present for the script, abort mission!
    ### Return:
    False if the regex failed to find matching hostname from the function call.

    True otherwise.
    """
    clearScreen()
    myHostIs = subprocess.run(["hostname"], shell=True, stdout=subprocess.PIPE)
    pattern = (
        r"(ada\.cs\.pdx\.edu|babbage\.cs\.pdx\.edu|quizor\d+\.cs\.pdx\.edu)"
    )
    if len(re.findall(pattern, myHostIs.stdout.decode("utf-8"))) == 0:
        return False
    return True


def makeConfigFile():
    """
    Creates the config file with all key fields needed from user input
    and verifies their input. If the file exists, it asks them to verify the
    information and confirm it or re-enter it with updated information.
    """
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
    if __CFG_EXISTS:
        print(
            "\n\n\n**ALERT**: DATABASE CONFIGURATION ALREADY EXISTS!"
            "\nCurrent configuration information: \n"
        )
        with open(__CFG_PATH, "r") as openfile:
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
            "\n**ALERT**: Would you like to UPDATE this information? (Y/N): "
        )

        if conf.lower() == "n":
            print("\n\nKeeping current configuration. . .\n\n")
            time.sleep(2)
            return

    print("\n\nGenerating new configuration file. . .\n")
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
        print("\nPlease enter the corrected information. . .")

    # Create the directory/JSON file
    if not __CFG_EXISTS:
        os.makedirs(os.path.dirname(__CFG_PATH), exist_ok=True)

    # Make a quick dictionary to dump w/ JSON
    config_info = {
        "username": username,
        "password": password,
        "db_address": db_address,
        "db_name": db_name,
        "rcvr_email": rcvr_email,
    }

    with open(__CFG_PATH, "w") as outfile:
        outfile.write(json.dumps(config_info, indent=4))

    print("\n\n!!!SAFE configuration file created !!!")
    time.sleep(2)


def executeNodeJSScripts():
    """
    Perform the NPM script options. This can be added to as the project is passed
    on and changed.
    """
    print(
        "\n\nNow performing deployment actions. Some directories related\n"
        + "the websites code may be removed to generate new versions.\n"
        + "\nThis is PERFECTLY NORMAL and TO BE EXPECTED if this script\n"
        + "has been ran previously.\n"
    )
    time.sleep(6)

    print("\nThis script will now resume.\n")
    time.sleep(3)

    print("\nRunning npm scripts to prepare website for deployment. . .\n")

    os.system("npm --silent i")

    # Clean builds never hurt anyone
    if __BUILD_EXISTS:
        print("\nFound old build dir. . .    removing. . .")
        shutil.rmtree(__BUILD_PATH)
    os.system("npm --silent run build")

    # Lets make the server executable and usable so that the site can
    # properly pass data from the page to the database
    if __JSOUT_EXISTS:
        print("\nJSoutFile directory found. . .    removing. . .")
        shutil.rmtree(__JSOUT_PATH)
    print("\nCompiling database server code. . .")
    os.system("npx --silent tsc")


def modifiyUserGroupPermissions():
    """
    Modifies the user group permissions so that the PSU linux systems apache
    server can access the SAFE directories and present the webpage.
    """
    # If the website fails to display, check these permissions against the
    # CAT's documentation on what permissions must be set for the apache
    # server to access the directories.
    # https://cat.pdx.edu/services/web/account-websites/
    print(
        "\nUNIX-like system detected. . . Running chmod changes on REQUIRED"
        + "directories for the SAFE website on PSU servers."
    )
    time.sleep(1)
    os.system("chmod 711 ../SAFE")
    os.system("chmod -R 711 ./build")
    print("\nModifications complete\n")
    time.sleep(1)


############ main ############
def main():
    # If the script is ran on non-unix machines, and -d or -D is not present
    # this message will appear and the script will terminate with sys.exit
    if whoIsMyHost() is False and not __DEBUG:
        print(
            "This script can only be ran on Portland State University "
            + "linux servers owned and operated by the CAT.\n"
            + "If this message is printed in error, the script needs to "
            + "be updated. Contact the development team for more "
            + "support.\n"
        )
        sys.exit()

    # If being ran with -d or -D, give the user notice
    if __DEBUG:
        print(
            "\n\nDEBUG MODE DETECTED. . .    SCRIPT WILL CONTINUE IN 3 "
            + "SECONDS. . .\n\n"
        )
        time.sleep(2)

    makeConfigFile()
    executeNodeJSScripts()

    # Ensure we are on the right type of system for this to actually work.
    if __OS_NAME == "posix":
        modifiyUserGroupPermissions()

    # We're finished!
    print("\n\nSAFE setup complete!\n\n")
    time.sleep(1)


if __name__ == "__main__":
    main()
