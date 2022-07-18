class Utils {

    usernameMinSize: number = 5;
    usernameMaxSize: number = 20;
    passwordMinSize: number = 8;
    passwordMaxSize: number = 30;

    statsURL: string = "http://ns3053040.ip-137-74-95.eu:3000/stats"
    loginURL: string = "http://ns3053040.ip-137-74-95.eu:3000/login"

    testToColor(toTest: string) {
        switch (toTest) {
            case "passed":
                return "green";

            case "failed":
                return "red";

            case "skipped":
                return "orange";

            default:
                return ""

        }
    }

    convertDateFromDbToRightFormat(date: string) {
        return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(2, 4)}`
    }

    getDateAndDeleteHourOnDbFormat(date: string | undefined) {
        return date !== undefined ? date.slice(0, 10) : "";
    }

    hasSpecialCharacters(string: string) {
        const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

        if (format.test(string)) {
            return true;
        } else {
            return false;
        }
    }

    verifUsername(username: string) {
        if (username.length >= this.usernameMinSize && username.length <= this.usernameMaxSize) {
            return true
        } else {
            return false
        }
    }

    verifPassword(password: string) {
        if (password.length >= this.passwordMinSize && password.length <= this.passwordMaxSize) {
            return true
        } else {
            return false
        }
    }

    isUpperCase(toTest: string) {

        if (toTest !== undefined) {
            if (toTest === toTest.toUpperCase()) {
                return true
            }
        }
        return false
    }

    isLowerCase(toTest: string) {
        if (toTest !== undefined) {
            if (toTest === toTest.toLowerCase()) {
                return true
            }
        }
        return false
    }

    formatStringToUpperAndLowerCase(toEdit: string) { //a opti
        return toEdit.replace(/[A-Z]/g, ' $&').trim().toLowerCase().replace(toEdit.charAt(0), toEdit.charAt(0).toUpperCase());
/*         let result = "";
        toEdit.split('').forEach((element, index) => {
            if (index === 0) {
                result += element.toUpperCase()
            } else if (this.hasSpecialCharacters(element)) {
                result += " ";
            } else if (this.isUpperCase(element) && this.isLowerCase(toEdit[index + 1])) {
                result += " ";
                result += element.toLowerCase()
            } else {
                result += element
                if (this.isLowerCase(element) && this.isUpperCase(toEdit[index + 1])) {
                    result += " ";
                }
            }
        });
        return result */
    }


    statsPath() {
        return this.statsURL;
    }

    loginPath() {
        return this.loginURL;
    }

    redirectStats() {
        window.location.href = this.statsPath();
    }

    redirectLogin() {
        window.location.href = this.loginPath();
    }

    redirectTo(URL: string) {
        window.location.href = URL;
    }

}



export default Utils;