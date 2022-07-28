import { clientAddress } from "../tools/address";

class Utils {
    usernameMinSize: number = 5;
    usernameMaxSize: number = 20;
    passwordMinSize: number = 8;
    passwordMaxSize: number = 30;

    statsURL: string = `${clientAddress}stats`;
    loginURL: string = `${clientAddress}login`;

    testToColor(toTest: string): string {
        //en fonction de l'état, on retourne une couleur (pour la classe)
        switch (toTest) {
            case "passed":
                return "green";

            case "failed":
                return "red";

            case "skipped":
                return "orange";

            default:
                return "";
        }
    }

    testCaseIdentifier(
        //différencie le nom et le numéro d'un test
        testName: string
    ): { identifier: string; name: string } | undefined {
        for (let i: number = 2; i < testName.length; i++) {
            //i = 2 pour ne pas prendre en compte les lettres "TC" (pour les tests asal)
            if (testName[i].length === 1 && testName[i].match(/[a-z]/i)) {
                //on regarde si le caractère est une lettre
                return {
                    identifier: testName.slice(0, i - 1),
                    name: testName.slice(i),
                };
            }
        }
    }

    convertDateFromDbToRightFormat(date: string): string {
        //convertit le format de la date retournée par la base dans un format plus conventionnel
        return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(2, 4)}`;
    }

    getDateAndDeleteHourOnDbFormat(date: string | undefined): string {
        //supprime la partie de l'heure sur le format de la date ==> plus besoin ?
        return date !== undefined ? date.slice(0, 10) : "";
    }

    hasSpecialCharacters(string: string): boolean {
        //verifie si une string possède un ou plusieurs charactères spéciaux
        const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

        if (format.test(string)) {
            return true;
        }
        return false;
    }

    isNumber(value: string): boolean {
        return value != null && value !== "" && !isNaN(Number(value));
    }

    verifUsername(username: string): boolean {
        //verifie les prérequis d'un username
        if (
            username.length >= this.usernameMinSize &&
            username.length <= this.usernameMaxSize
        ) {
            return true;
        }
        return false;
    }

    verifPassword(password: string): boolean {
        //verifie les prérequis d'un password
        if (
            password.length >= this.passwordMinSize &&
            password.length <= this.passwordMaxSize
        ) {
            return true;
        }
        return false;
    }

    isUpperCase(toTest: string): boolean {
        //verifie si le caractère est une majuscule
        if (toTest !== undefined) {
            if (toTest === toTest.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    isLowerCase(toTest: string): boolean {
        //verifie si le caractère est une minuscule
        if (toTest !== undefined) {
            if (toTest === toTest.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    formatStringToUpperAndLowerCase(toEdit: string): string {
        //formatte les noms
        //return toEdit.replace(/[A-Z]/g, ' $&').trim().toLowerCase().replace(toEdit.charAt(0), toEdit.charAt(0).toUpperCase());
        let result = "";
        toEdit.split("").forEach((element, index) => {
            if (index === 0) {
                result += element.toUpperCase();
            } else if (this.hasSpecialCharacters(element)) {
                result += " ";
            } else if (
                this.isUpperCase(element) &&
                this.isLowerCase(toEdit[index + 1]) &&
                !this.isUpperCase(toEdit[index - 1])
            ) {
                result += " ";
                result += element.toLowerCase();
            } else {
                result += element;
                if (
                    this.isUpperCase(element) &&
                    !this.isUpperCase(toEdit[index + 1]) &&
                    this.isUpperCase(toEdit[index - 1]) &&
                    !(
                        this.isUpperCase(element) &&
                        this.isLowerCase(toEdit[index + 1]) &&
                        !this.isNumber(toEdit[index + 1])
                    )
                ) {
                    result += " ";
                }
            }
        });
        return result;
    }

    statsPath(): string {
        return this.statsURL;
    }

    loginPath(): string {
        return this.loginURL;
    }

    redirectStats(): void {
        window.location.href = this.statsPath();
    }

    redirectLogin(): void {
        window.location.href = this.loginPath();
    }

    redirectTo(URL: string): void {
        window.location.href = URL;
    }

    isStatsPage(): boolean {
        if (window.location.href === this.statsPath()) {
            return true;
        }
        return false;
    }

    isLoginPage(): boolean {
        if (window.location.href === this.loginPath()) {
            return true;
        }
        return false;
    }

    getUniqueValueFromArrayOfObject(
        array: Array<any>,
        key: string | number
    ): Array<any> {
        return Array.from(
            new Map(array.map((item) => [item[key], item])).values()
        );
    }
}

export default Utils;
