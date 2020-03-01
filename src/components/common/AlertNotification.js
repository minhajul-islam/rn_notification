export class AlertNotification {
    static dropDown;
    static onClose;

    static setDropDown(dropDown) {
        this.dropDown = dropDown;
    }

    // payload = { message: 'HelloWorld', source: ReactNativeLogo };
    static show(type, title, message) {
        if (this.dropDown) {
            if(type==='notification'){
                const uri='https://miro.medium.com/max/1566/1*c3cQvYJrVezv_Az0CoDcbA.jpeg';
                this.dropDown.alertWithType('info', title, message.body,{message: message.body, source:uri},5000);
               // this.dropDown.alertWithType('custom', title, message.body,uri,5000);
            }
            else {
                this.dropDown.alertWithType(type, title, message,this.getIcon(type,message));
            }
        }
        // this.dropDownAlertRef.alertWithType(
        //     item.type,
        //     title,
        //     item.message,
        //     payload,
        //     interval
        // );
    }


    static getIcon(type, message) {
        switch (type) {
            case 'info':
                return {message: message, source:require('../../assets/icon/ic_toast_information.png')};
            case 'warn':
                return  {message: message, source:require('../../assets/icon/ic_toast_warn.png')};
            case 'error':
                return  {message: message, source:require('../../assets/icon/ic_toast_error.png')};
            case 'success':
                return {message: message, source:require('../../assets/icon/ic_toast_success.png')};
            default:
                return {message: message, source:require('../../assets/icon/ic_toast_information.png')};

        }
    }

    static setOnClose(onClose) {
        this.onClose = onClose;
    }

    static invokeOnClose() {
        if (typeof this.onClose === 'function') {
            this.onClose();
        }
    }
}
