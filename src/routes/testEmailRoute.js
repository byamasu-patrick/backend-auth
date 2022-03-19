import { sendEmail } from "./util/sendEmail";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'ptrckbyamasu@gmail.com',
                from: 'ptrckbyamasu@gmail.com',
                subject: 'Does this works?',
                text: 'If you are seeing this, then yes it works. This is a test email from the application that I am developing.',               
                html: '<strong>If you are seeing this, then yes it works. This is a test email from the application that I am developing.</strong>',
            });
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};