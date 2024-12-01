function headerMKU(){
    return `
        <header style="background: #e0deee; padding: 20px 15px;">
            <table role="presentation" style="width: 100%; border: 0;">
                <tr>
                    <td style="text-align: left;">
                        <a href="https://mku-journal.com.ua/">mku-journal.com.ua</a>
                    </td>
                    <td style="text-align: right;">
                        <img src="https://mku-journal.com.ua/logo.png" alt="logo" />
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
                    <p style="font-weight: bold; margin-top: 10px;">Посилання на сайт: <a href="https://mku-journal.com.ua/">https://mku-journal.com.ua/</a></p>
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
                    <p style="font-weight: bold; margin-top: 10px;">З повагою, админістрація МКУ ім.Пилипа Орлика</p>
                </td>
            </tr>
        </table>
    `
}

module.exports = {resendPassword, sendRegister}