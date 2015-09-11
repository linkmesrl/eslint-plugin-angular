module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0],
                convertedPrefix; // convert string from JSON .eslintrc to regex

            if(prefix === undefined) {
                return;
            }

            convertedPrefix = utils.convertPrefixToRegex(prefix);

            if (utils.isAngularConstantDeclaration(node)) {
                var name = node.arguments[0].value;

                if(name !== undefined && name.indexOf('$') === 0){
                    context.report(node, 'The {{constant}} constant should not start with "$". This is reserved for AngularJS constants', {
                        constant: name
                    });
                } else if(name !== undefined && !convertedPrefix.test(name)){
                    if(typeof prefix === 'string' && !utils.isStringRegexp(prefix)){
                        context.report(node, 'The {{constant}} constant should be prefixed by {{prefix}}', {
                            constant: name,
                            prefix: prefix
                        });
                    } else {
                        context.report(node, 'The {{constant}} constant should follow this pattern: {{prefix}}', {
                            constant: name,
                            prefix: prefix.toString()
                        });
                    }
                }
            }
        }
    };

};
