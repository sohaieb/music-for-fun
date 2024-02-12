/**
 * Music entity schema
 *
 * @type {{attachedFile: {isString: boolean, notEmpty: boolean}, description: {isString: boolean, notEmpty: boolean}, title: {isString: boolean, notEmpty: boolean}}}
 */
module.exports = {
    title: {
        in: ['body'],
        errorMessage: 'Title is required',
        isString: true,
        notEmpty: true
    },
    description: {
        in: ['body'],
        isString: true,
        optional: true
    }/*,
    attachedFile: {
        in: ['body'],
        isString: {
            errorMessage: 'attachedFile have to be an image url'
        },
        notEmpty: {
            errorMessage: 'attachedFile is required'
        }
    }*/
}