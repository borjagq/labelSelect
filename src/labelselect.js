/**
 * @file labelselect.js
 * @brief labelSelect jQuery extension.
 * @version 1.0.2 (2016-10-06)
 * @date 2016-10-03
 * @author Borja García Quiroga <@borjagq>
 * 
 * 
 * Copyright (c) 2016 Borja García Quiroga
 * 
 * This code is licensed under MIT license (see LICENSE for details).
 */

(function ($) {

    /**
     * @brief Transforms the this object into a labelSelect object.
     * 
     * Transforms the this object into a labelSelect object.
     * 
     * @param {undefined|object|string} att1 Object of options or option key.
     * @param {undefined|string|array|integer} att2 Option value.
     * 
     * @author Borja García Quiroga <@borjagq>
     * 
     * @throws Error
     * @throws TypeError
     */
    $.fn.labelSelect = function(att1, att2) {

        // Make _self an alias of the jQuery object.
        var _self = this;

        // Retrieve the object's set options from the data in the jQuery object.
        var labelSelectOptions = _self.data('labelSelectOptions');

        // Private function to check if the option exists.
        /**
         * @brief Check if the 'option' is valid.
         * 
         * Check if str is a valid labelSelect option.
         * 
         * @param {string} att1 Option key to be checked.
         */
        var _isOption = function(str) {

            let validOptions = [
                'replacedLabelOnSelect',
                'extraClass',
                'for',
                'highlightSel',
                'theme',
                'unfoldDir',
                'values',
                'width'
            ]

            // Return if str is within the valid options.
            return validOptions.includes(str);

        }

        // If the options are empty, it means that the object was never set.
        // If this is the case, we will init the default options and set the
        // events.
        if (labelSelectOptions == null) {
            
            var w = _self.width();
            
            labelSelectOptions = {
                replacedLabelOnSelect: true,
                extraClass:     '',
                for:            false,
                highlightSel:   true,
                theme:          'white',
                unfoldDir:      'down',
                values:         [],
                width:          w + 'px'
            };

            _self.on('click', function(e) {
            
                e.stopPropagation();
                _self.labelSelect('refresh');
            
            });

            // Automatic fold if click detected outside.
            $(document).on('click', function (e) {

                $('label .labelSelect.unfolded').trigger('click');

            });

        }

        // If att1 is an object, then we are before the first scenario: an
        // object such that {option: value}.
        if (typeof att1 === 'object') {

            let objectKeys = Object.keys(att1);

            for (var i = 0; i < objectKeys.length; ++i) {

                let optionName = objectKeys[i];
                let optionValue = att1[optionName];

                if (_isOption(optionName))
                    labelSelectOptions[optionName] = optionValue;

            }

            // Store the new options in the object's data.
            _self.data('labelSelectOptions', labelSelectOptions);

            _self.labelSelect('refresh');

        // If att1 is 'refresh', then we will build the selector.
        } else if (typeof att1 === 'string' && att1 === 'refresh') {

            // Set the CSS properties.
            _self.css({
                'position':   'relative',
                'height':     '1.6em',
                'display':    'inline-block',
                'width':      labelSelectOptions.width,
                'min-width':  labelSelectOptions.width
            });

            // Store the options.
            if (_self.data('selected') == null)
                _self.data('selected', 'none');
            
            _self.empty();

            // Create the DOM element.
            var elm = $("<div class='labelSelect'><span></span></div>");
            
            if (labelSelectOptions.highlightSel)
                elm.addClass('highlight-selection');

            elm.addClass('theme_' + labelSelectOptions.theme);
            elm.addClass('unfold_' + labelSelectOptions.unfoldDir);
            elm.addClass(labelSelectOptions.extraClass);

            // Create the list of options that will be displayed.
            var ul = $("<ul></ul>");
            ul.append("<li data-id='none'></li>");

            for (var i = 0; i < labelSelectOptions.values.length; ++i) {

                let valId = labelSelectOptions.values[i].id;
                let valLabel = labelSelectOptions.values[i].label;
                
                if (valId == 'none') {
                    throw new Error('ValueError: id \'none\' is reserved');
                }
                
                ul.append("<li data-id='" + valId + "'>" + valLabel + "</li>");

            }

            // Set the selected item as such.
            let selectedId = _self.data('selected');
            ul.children('li[data-id=' + selectedId + ']').addClass('selected');

            ul.children('li').on('click', function(e) {

                // Remove the previous selection, select the option clicked,
                // and set its text as the label text.
                $(this).parent().children('li').removeClass('selected');
                $(this).addClass('selected');
                $(this).parent().parent().children('span').html($(this).html());

                if ($($(this).parents('label')[0]).data('selected') !=
                        $(this).attr('data-id')) {
                    
                    $($(this).parents('label')[0]).data('selected',
                            $(this).attr('data-id'));
                    
                    $(_self).trigger('change');

                }

                if ($(this).attr('data-id') == 'none') {
                    
                    $(_self).trigger('selectNone');
                    
                    $(this).parent().parent().children('span').addClass('selected-none')
                    
                    return;
                
                } else {
                    
                    $(this).parent().parent().children('span').removeClass('selected-none')
                    
                    $(_self).trigger('selectOption');
                
                }

                if (labelSelectOptions.replacedLabelOnSelect) {

                    e.stopPropagation();

                    _self.labelSelect('replaceLabel');

                }

            });

            elm.on('click', function (e) {

                $('label .labelSelect.unfolded').not(this).trigger('click');

                let n = ($(this).children('ul').children('li').length + 1) *
                        1.6;
                
                $(this).toggleClass('unfolded');

                if ($(this).hasClass('unfolded')) {

                    $(this).children('ul').css('max-height', n + 'em');
                    $(this).trigger('unfolded');

                } else {

                    $(this).children('ul').css('max-height', 0);
                    $(this).trigger('folded');

                }

                e.stopPropagation();

            });

            if (labelSelectOptions.unfoldDir == 'up') {

                elm.prepend(ul);

            } else {

                elm.append(ul);

            }

            elm.children('span').html(elm.find('ul li.selected').html());

            if (elm.find('ul li.selected').attr('data-id') == 'none') {

                elm.children('span').addClass('selected-none');

            } else {

                elm.children('span').removeClass('selected-none');

            }

            if (labelSelectOptions.for) {
                _self.attr('data-for', labelSelectOptions.for);
                _self.attr('for', labelSelectOptions.for);
            } else {
                _self.attr('data-for', '');
                _self.attr('for', '');
            }

            $(this).trigger('refreshed');

            _self.append(elm);

        // If att1 is a string, then we are before the second scenario: a string
        // acting as the option name in att1 followed by the option value in
        // att2.
        } else if (typeof att1 === 'string') {

            if (_isOption(att1)) {

                // If att2 is set, then let's set the option value. Otherwise,
                // we want to retrieve it.
                if (att2 != null) {
                    
                    labelSelectOptions[att1] = att2;

                    // Store the new options in the object's data.
                    _self.data('labelSelectOptions', labelSelectOptions);

                    _self.labelSelect('refresh');

                } else {

                    return labelSelectOptions[att1];

                }

            } else {

                // There's another scenario, setSelected & getSelected. These
                // two methods are to set and get the selected labelSelect label
                // text option.
                if (att1 == 'setSelected') {

                    if (typeof att2 == 'string' && att2 != null) {

                        // Get the selected text's id.
                        var id = _self.find('li[data-id=' + att2 + ']');

                        // If the text exists, hit click on it.
                        if (id != null && id.length > 0) {
                            
                            $(id[0]).trigger('click');

                        // Otherwise, if it does not exist, throw an error.    
                        } else {

                            throw new TypeError('labelSelect\'s setSelected ' +
                            'method requires an existing option as parameter.');
                            
                        }

                    } else {

                        throw new TypeError('labelSelect\'s setSelected ' +
                                'method requires a valid non-emtpy string as ' +
                                'parameter.');

                    }

                } else if (att1 == 'getSelected') {

                    // Return the selected text.
                    return _self.data('selected');

                } else if (att1 == 'replaceLabel') {

                    // Get the value of the selection.
                    let selID = _self.data('selected');

                    // If none is selected, we cannot replace the selector.
                    if (selID == 'none')
                        return;
                
                    // Get the selected text that will go in the label.
                    let selTxt = _self.find('li[data-id=' + selID + ']').html();

                    _self.css({
                        position: '',
                        height: '',
                        display: ''
                    });

                    _self.html(selTxt);

                    _self.trigger('replacedLabel');

                }

            }

        }

        return _self;

    }

})(jQuery);