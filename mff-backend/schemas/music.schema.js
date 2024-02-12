/**
 * Music entity schema
 *
 * @type {{imageUrl: {isString: boolean, notEmpty: boolean}, description: {isString: boolean, notEmpty: boolean}, title: {isString: boolean, notEmpty: boolean}}}
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
    },
    imageUrl: {
        in: ['body'],
        isString: {
            errorMessage: 'imageUrl have to be an image url'
        },
        notEmpty: {
            errorMessage: 'imageUrl is required'
        }
    }
}