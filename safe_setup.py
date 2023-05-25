import os
import json
import shutil
import socket
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
__HOST_IS = socket.gethostname() # Get a string of the hostname for us


# Is that host *the* VM for SAFE? True or False
__HOST_IS_FEEDBACK_VM = True if __HOST_IS == "feedback.cs.pdx.edu" else False
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
    
    # This regex looks for psu specific servers that the original team used in
    # the development process. ada, babbage, and rita were all used before the
    # VM (feedback.cs.pdx.edu) was stood up. Quizor is added just incase.
    pattern = r"(feedback|ada|babbage|quizor\d+\.cs\.pdx\.edu|rita\.cecs\.pdx\.edu)"
    if __HOST_IS_FEEDBACK_VM:
        return True # We 100% know we are allowed because we are the VM!
    elif re.match(pattern, __HOST_IS) == False:
        return False
    return True

def runFullSetup():
    """
    Runs the entire setup process for the app in a set particular order
    to ensure algorithmic deployment
    """
    clearScreen()
    makeConfigFile()
    executeNpmAll()
    print("\n\nSAFE setup complete!\n\n")

def makeConfigFile():
    """
    Creates the config file with all key fields needed from user input
    and verifies their input. If the file exists, it asks them to verify the
    information and confirm it or re-enter it with updated information.
    """
    print(
        "Welcome to SAFE (System for Anonymous Feedback) "
        "configuration setup.\n\n"
        "This will guide you through setting up your connection to a\n"
        "specific database."
        "\n\n**NOTICE** -- You must already have PostgresSQL database setup\n"
        "and accessible with a username and password before continuing."
    )

    # If this path/file exist then ensure they want to override the information
    if os.path.exists(__CFG_PATH):
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
            "\n**ALERT**: Would you like to *KEEP* this information? (Y/N): "
        )

        if conf.lower() == "y":
            print("\n\nKeeping current configuration. . .\n\n")
            time.sleep(1)
            return

    print("\n\nGenerating new configuration file. . .\n")
    # Prompt the user for the database credentials
    while True:
        username = input("Enter the username: ")

        password = input("\nEnter the password: ")

        db_address = input("\nEnter the PostgreSQL database address: ")

        db_name = input("\nEnter the database name: ")

        rcvr_email = input("\nEnter the receiver email: ")

        print_info(username, password, db_address, db_name, rcvr_email)

        conf = input("\nIs this correct? (Y/N): ")
        if conf.lower() == "y":
            break
        clearScreen()
        print("\nPlease enter the corrected information. . .")

    # Create the directory/JSON file
    if not os.path.exists(__CFG_PATH):
        os.makedirs(os.path.dirname(__CFG_PATH), exist_ok=True)

    # Make a quick dictionary to dump w/ JSON
    config_info = {
        "username": username,
        "password": password,
        "db_address": db_address,
        "db_name": db_name,
        "rcvr_email": rcvr_email,
    }

    # Dump that dictionary to the file
    with open(__CFG_PATH, "w") as outfile:
        outfile.write(json.dumps(config_info, indent=4))

    print("\n\n!!!SAFE configuration file created !!!")
    time.sleep(2)


def executeNpmAll():
    """
    Executes all npm scripts that would be required on initial setup or if the
    person running the script elects to run all the npm scripts again from a
    fresh build
    """
    print(
        "\n\nNow performing NPM deployment actions. Some directories related\n"
        "the websites code may be removed to generate new versions.\n"
        "\nThis is PERFECTLY NORMAL and TO BE EXPECTED if this script\n"
        "has been ran previously.\n"
    )
    time.sleep(6)

    print("\nThis script will now resume.\n")
    time.sleep(3)
    executeNpmInstall()
    executeNpmRunBuild()
    executeNpxTsc()


def executeNpmInstall():
    """
    Run the `npm install` script.
    """
    print(
        "\n**********************************************************"
        "\nCalling 'npm install' to install any missing packages. . ."
        "\n**********************************************************"
    )
    if __DEBUG:  # Tell us what's really happening behind the scenes
        os.system("npm i")
    else:
        os.system("npm --silent i")
    print(
        "\n************************"
        "\n'npm install' complete!!"
        "\n************************"
    )


def executeNpmRunBuild():
    """
    Executes the `npm run build` script.
    """
    # Clean builds never hurt anyone
    if os.path.exists(__BUILD_PATH):
        print("\n\nFound old build dir. . .    removing. . .")
        shutil.rmtree(__BUILD_PATH)
    print(
        "\n***********************************"
        "\nCalling script 'npm run build'. . ."
        "\n***********************************"
    )
    if __DEBUG:  # Tell us what's really happening behind the scenes
        os.system("npm run build")
    else:
        os.system("npm run --silent build")
    print(
        "\n**************************"
        "\n'npm run build' complete!!"
        "\n**************************"
    )
    modifyUserGroupPermissions()
        
    # If the host is the VM, lets just copy our brand new build and deploy!
    # Nothing could go wrong if we do... right? TEST YOUR BUILDS OFF THE VM
    # FIRST AND THIS SHOULD BE FIIIIIIINE.
    if __HOST_IS_FEEDBACK_VM == True: 
        print(
            "\n***************************************************************"
            "\nCopying new build to 'SAFEdeploy' with correct permissions. . ."
            "\n***************************************************************"
        )
        time.sleep(2)        
        os.system("rm -fr ~/SAFEdeploy/*")
        os.system("cp -rp ./build/* ~/SAFEdeploy/")
        print(
        "\n***************"
        "\nCopy complete!!"
        "\n***************"
        )
        time.sleep(2)        


def executeNpxTsc():
    """
    Rebuilds `src/safeMessageDB/server.ts` to `.js` for us to run the backend
    server to process requests from the website.
    """
    # Lets make the server executable and usable so that the site can
    # properly pass data from the page to the database
    if os.path.exists(__JSOUT_PATH):
        print("\nJSoutFile directory found. . .    removing. . .")
        shutil.rmtree(__JSOUT_PATH)
    print(
        "\n******************************************************"
        "\nCalling 'npx tsc' to compile database server code. . ."
        "\n******************************************************"
    )
    if __DEBUG:  # Tell us what's really happening behind the scenes
        os.system("npx tsc")
    else:
        os.system("npx --silent tsc")
    print(
        "\n********************"
        "\n'npx tsc' complete!!"
        "\n********************"
    )


def modifyUserGroupPermissions():
    """
    Modifies the user group permissions so that the PSU linux systems apache
    server can access the SAFE directories and present the webpage.
    """
    # If the website fails to display, check these permissions against the
    # CAT's documentation on what permissions must be set for the apache
    # server to access the directories.
    # https://cat.pdx.edu/services/web/account-websites/
    
    # DO NOT RUN CHMOD 711 ON BUILD ON THE VM!!!! This is a security issue that
    # will alert the CAT. Instead, we want to chmod 700 build *then*
    # chmod 711 -R build/* to get the internals properly setup!
    if __OS_NAME == "posix":
        print(
            "\nUNIX-like system detected. . . Running chmod changes on REQUIRED"
            "\ndirectories for the SAFE website on PSU servers."
        )
        time.sleep(1)
        os.system("chmod 711 ../SAFE") # Gotta make SAFE visible first.
        
        # Then the others under the conditions laid out above in the comments.
        if __HOST_IS_FEEDBACK_VM == False and os.path.exists(__BUILD_PATH):
            os.system("chmod -R 711 ./build")
        elif __HOST_IS_FEEDBACK_VM == True and os.path.exists(__BUILD_PATH):
            os.system("chmod 700 ./build && chmod 711 -R ./build/*")
                
            
        print("\nModifications complete\n")
        time.sleep(1)
    return


def scriptMenu():
    """
    Navigate the script to match users desired needs.
    """
    option = -1
    print("\nSAFE developer deployment script\n")
    while True:
        option = input(
            "\nSelect which task you need to execute:"
            "\n\t1)  Execute full deployment (all of the below except option 6)."
            "\n\t2)  Edit SAFE configuration file."
            "\n\t3)  Run 'npm install' to get missing packages."
            "\n\t4)  Run 'npm run build' to build website."
            "\n\t5)  Run 'npx tsc' to compile REST api script."
            "\n\t6)  Run options 3-5."
            "\n\t0)  Exit this script."
            "\n\nOption: "
        )
        print("\n")
        # Python added their version of switch statements in 3.10. If the script
        # fails to run at this point, ensure that python is up to date on the
        # machine running this script. This just looks and runs nicer than a
        # bunch of if/else if statements.
        match option:
            case "1":
                runFullSetup()
            case "2":
                clearScreen()
                makeConfigFile()
            case "3":
                clearScreen()
                executeNpmInstall()
            case "4":
                clearScreen()
                executeNpmRunBuild()
            case "5":
                clearScreen()
                executeNpxTsc()
            case "6":
                clearScreen()
                executeNpmAll()
            case "0":
                return
            case _: # Default case if user picks bad option.
                print("\n\n**ERROR** - Invalid option. . .\n")


############ main ############
def main():
    # If the script is ran on non-unix machines, and -d or -D is not present
    # this message will appear and the script will terminate with sys.exit
    if whoIsMyHost() is False and not __DEBUG:
        print(
            "\nThis script can only be ran on Portland State University "
            "linux servers owned and operated by the CAT."
            "\nIf this message is printed in error, the script needs to "
            "be updated. Contact the development team for more "
            "support.\n"
        )
        sys.exit()

    # If being ran with -d or -D, give the user notice
    if __DEBUG:
        print(
            "\n\nDEBUG MODE DETECTED. . .    SCRIPT WILL CONTINUE IN 3 "
            "SECONDS. . .\n\n"
        )
        time.sleep(2)

    # Has the script EVER been ran before? If not, force setup to take place.
    if not os.path.exists(__CFG_PATH):
        print(
            "\n\n\t\t\tNOTICE:\n"
            "It appears this script has never been ran before. This\n"
            "script will now take you through the process of generating the\n"
            "required configuration information. Once that is complete, it\n"
            "will build the project.\n\n"
        )
        time.sleep(5)
        print("\nResuming script . . .\n")
        time.sleep(2)
        runFullSetup()
        
    # Nice little menu to use this script.
    scriptMenu()

    # We're finished!
    print("Exiting script. . .\n\n\n")
    time.sleep(1)


if __name__ == "__main__":
    main()
