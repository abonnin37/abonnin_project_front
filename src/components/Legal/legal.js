import React from "react";

import style from "./legal.module.scss";

const Legal = () => {

    return (
        <div className={style.legal}>
            <h1>Mentions Légales</h1>

            <section className={style.identificationActivite}>
                <h2>Identification et Activité</h2>
                <table>
                    <tr>
                        <td>
                            <strong>Société :</strong>
                        </td>
                        <td>
                            MONSIEUR ALEXANDRE BONNIN
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Contact :</strong>
                        </td>
                        <td>
                            Alexandre Bonnin
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Adresse :</strong>
                        </td>
                        <td>
                            11 rue des Glycines<br/>
                            37300 Joué lès Tours
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Pays :</strong>
                        </td>
                        <td>
                            France
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Numéro d'entreprise :</strong>
                        </td>
                        <td>
                            89417075200014
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Code d'activité :</strong>
                        </td>
                        <td>
                            6201Z Programmation informatique
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Numéro de téléphone :</strong><br/>
                        </td>
                        <td>
                            [FR] +33 7 78 07 07 70<br/>
                            [BR] +55 11 911 500 687
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Adresse email :</strong><br/>
                        </td>
                        <td>
                            bonnin.a.k@gmail.com
                        </td>
                    </tr>
                </table>
            </section>

            <section className={style.condition}>
                <h2>Condition d'utilisation</h2>
            </section>
        </div>
    );
}

export default Legal;