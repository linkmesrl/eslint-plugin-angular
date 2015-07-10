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

            if (utils.isAngularProviderDeclaration(node)) {
                var name = node.arguments[0].value;

                if(name !== undefined && name.indexOf('$') === 0){
                    context.report(node, 'The {{provider}} provider should not start with "$". This is reserved for AngularJS providers', {
                        provider: name
                    });
                } else if(name !== undefined && !convertedPrefix.test(name)){
                    if(typeof prefix === 'string' && !utils.isStringRegexp(prefix)){
                        context.report(node, 'The {{provider}} provider should be prefixed by {{prefix}}', {
                            provider: name,
                            prefix: prefix
                        });
                    } else {
                        context.report(node, 'The {{provider}} provider should follow this pattern: {{prefix}}', {
                            provider: name,
                            prefix: prefix.toString()
                        });
                    }
                }
            }
        }
    };

};
