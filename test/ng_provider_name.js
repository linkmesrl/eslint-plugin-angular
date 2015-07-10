//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var valid = [], invalid = [];
['provider'].forEach(function(syntax){
    valid.push({
        code: 'app.' + syntax + '("eslintProvider", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'app.' + syntax + '("eslintProvider", function(){});',
        args: [1, /^eslint/]
    }, {
        code: 'app.' + syntax + '("eslintProvider", function(){});',
        args: [1, undefined]
    }, {
        code: 'app.' + syntax + '("eslintProvider", function(){});',
        args: [1, '/^eslint/']
    });

    invalid.push({
        code: 'app.' + syntax + '("Provider", function(){});',
        args: [1, 'eslint'],
        errors: [{ message: 'The Provider provider should be prefixed by eslint'}]
    }, {
        code: 'app.' + syntax + '("esLintProvider", function(){});',
        args: [1, 'eslint'],
        errors: [{ message: 'The esLintProvider provider should be prefixed by eslint'}]
    }, {
        code: 'app.' + syntax + '("Provider", function(){});',
        args: [1, /^eslint/],
        errors: [{ message: 'The Provider provider should follow this pattern: /^eslint/'}]
    }, {
        code: 'app.' + syntax + '("Provider", function(){});',
        args: [1, '/^eslint/'],
        errors: [{ message: 'The Provider provider should follow this pattern: /^eslint/'}]
    }, {
        code: 'app.' + syntax + '("$Provider", function(){});',
        args: [1, /^eslint/],
        errors: [{ message: 'The $Provider provider should not start with "$". This is reserved for AngularJS providers'}]
    });
});


var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_provider_name', {
    valid: valid,
    invalid: invalid
});
