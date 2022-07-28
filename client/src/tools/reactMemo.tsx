/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useState, useCallback } from "react";

//* Petit Mémo React, sur les principales fonctions utiles et utilisées

//! Vidéo explicative : https://www.youtube.com/watch?v=LlvBzyy-558

//! créer un composant :
//? créer un fichier .tsx, l'ouvrir, tappez rfce puis "enter". la base du composant devrait se créer.

//? exemple après execution de rfce :

import React from "react";

function reactMemo() {
    return <div>reactMemo</div>;
}

export default reactMemo;

//! useState :
//? useState permet de conserver sa valeur au travers de l'actualisation des composants

const [exemple, setExemple] = useState<string>("initial value");

//? exemple représente la valeur, setExemple permet de la modifier :

console.log(exemple); //initial value

setExemple("second value");
console.log(exemple); //second value

//! useEffect :
//? useEffect permet d'executer des fonctions dès que le chargement du composants, ou après son actualisation

useEffect(() => {
    console.log("bonjour");
}, []);

//? le tableau de dépendance permet de n'executer la fonction que si les valeurs à l'intérieur ont changé :

const [a, setA] = useState<string>("initial value");

useEffect(() => {
    console.log(a); //affiché une seule fois, tant que la valeur de a ne change pas
}, [a]);

//! useMemo :
//? useMemo permet de garder une valeur a travers les actualisations et de la recalculer si une valeur change

const c = 12;
const b = useMemo(() => "", []);

//? le tableau de dépendance fonctionne de la meme façon que celui du useEffect
//ici, memo gardera sa valeur a travers les actualisations du composants, mais le calcul 18 + c ne sera effectué uniquement si la valeur de c a changée
const memo = useMemo(() => 18 + c, [c]);

//! useCallback :
//? useCallback permet de garder une valeur de retour de fonction a travers les actualisations et de la recalculer si une valeur change
//? c'est la même chose que useMemo, mais sur les fonctions :

const e = useCallback(() => {
    return memo + c;
}, [memo, c]);

//! useContext :
//? useContext se couple a d'autre fonctions React, et permet d'accéder a un state depuis un autre composant enfant
// voir exemples dans le fichier context.tsx
