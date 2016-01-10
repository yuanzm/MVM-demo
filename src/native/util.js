function insertHTML(_aoDomObj, _asWhere, _asHtml) {
    if (!_aoDomObj) {
        return false;
    }
    try {
        // err ex: textarea afterBegin ... ( can not insert ... )
        if (_aoDomObj.insertAdjacentHTML) {
            _aoDomObj.insertAdjacentHTML(_asWhere, _asHtml);
        } else {
            var _oRange = _aoDomObj.ownerDocument.createRange(),
                _abIsBefore = _asWhere.indexOf("before") == 0,
                _abIsBegin = _asWhere.indexOf("Begin") != -1;
            if (_abIsBefore == _abIsBegin) {
                _oRange[_abIsBefore ? "setStartBefore" : "setStartAfter"](_aoDomObj);
                _aoDomObj.parentNode.insertBefore(
                    _oRange.createContextualFragment(_asHtml), _abIsBegin ? _aoDomObj : _aoDomObj.nextSibling
                );
            } else {
                var _oDomObj = _aoDomObj[_abIsBefore ? "lastChild" : "firstChild"];
                if (_oDomObj) {
                    _oRange[_abIsBefore ? "setStartAfter" : "setStartBefore"](_oDomObj);
                    _aoDomObj[_abIsBefore ? "appendChild" : "insertBefore"](_oRange
                        .createContextualFragment(_asHtml), _oDomObj);
                } else {

                    _aoDomObj.innerHTML = _asHtml;
                }
            }
        }
        return true;
    } catch (_oError) {
        //debug(_oError.message)
        return false;
    }
}