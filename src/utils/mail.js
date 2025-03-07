function headerMKU(){
    return `
        <header style="background: #e0deee; padding: 20px 15px;">
            <table role="presentation" style="width: 100%; border: 0;">
                <tr>
                    <td style="text-align: left;">
                        <a href="https://3p-vln.github.io/Vitamin/">Vitamin</a>
                    </td>
                 
                </tr>
            </table>
        </header>
    `;
}

function resendPassword(password) {
    return `
        ${headerMKU()}
        
        <table role="presentation" style="width: 100%; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black;  text-align: center; padding: 20px;">
            <tr>
                <td>
                    <p style="margin: 0; font-size: 18px; font-weight: 700;">Ваше посилання для відновлення:</p>
                    <p style="font-weight: bold; margin-top: 10px;">${password}</p>
                      <p style="font-weight: bold; margin-top: 10px;">Це були не ви? Проігноруєте повідомлення, з повагою - команда Розробників</p>
                    <p style="font-weight: bold; margin-top: 10px;">Посилання на сайт: <a href="https://3p-vln.github.io/Vitamin/">Vitamin</a></p>
                </td>
            </tr>
        </table>
    `
}

function sendRegister() {
    return `
        ${headerMKU()}
        
        <table role="presentation" style="width: 100%; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black;  text-align: center; padding: 20px;">
            <tr>
                <td>
                    <p style="margin: 0; font-size: 18px; font-weight: 700;">Ви успішно зарєструвались на сайті</p>
                    <p style="font-weight: bold; margin-top: 10px;">Очікуйте верифікацію вашого аккаунту</p>
                    <p style="font-weight: bold; margin-top: 10px;">З повагою, админістрація Vitamin</p>
                </td>
            </tr>
        </table>
    `
}

module.exports = {resendPassword, sendRegister}