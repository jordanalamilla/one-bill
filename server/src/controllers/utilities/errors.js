/**
 * Display Error
 *
 * Send an error message to the user and log the full error in the server console.
 *
 * @param {Object} res The response object
 * @param {Object} error The error object
 * @param {String} controllerName The name of the controller throwing the error
 */
export function displayError(res, error, controllerName) {
    res.status(500).json({
        message: error.message,
    });

    console.error(`Error in ${controllerName} controller: `, error);
}