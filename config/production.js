/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

function parse_url(str, component) {
// http://kevin.vanzonneveld.net
// +      original by: Steven Levithan (http://blog.stevenlevithan.com)
// + reimplemented by: Brett Zamir (http://brett-zamir.me)
// + input by: Lorenzo Pisani
// + input by: Tony
// + improved by: Brett Zamir (http://brett-zamir.me)
// + improved by: Ben Ng (http://benng.me)
// %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
// %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
// %          note: a seriously malformed URL.
// %          note: Besides function name, is essentially the same as parseUri as well as our allowing
// %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
// *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
// *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
	var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
          'relative', 'path', 'directory', 'file', 'query', 'fragment'],
	ini = (this.php_js && this.php_js.ini) || {},
  mode = (ini['phpjs.parse_url.mode'] &&
    ini['phpjs.parse_url.mode'].local_value) || 'php',
  parser = {
    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
  };
 
  var m = parser[mode].exec(str),
    uri = {},
    i = 14;
  	while (i--) {
    	if (m[i]) {
      	uri[key[i]] = m[i];
    	}
  	}
 
  if (component) {
    return uri[component.replace('PHP_URL_', '').toLowerCase()];
  }
  if (mode !== 'php') {
    var name = (ini['phpjs.parse_url.queryKey'] &&
        ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
    parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
    uri[name] = {};
    uri[key[12]].replace(parser, function ($0, $1, $2) {
      if ($1) {uri[name][$1] = $2;}
    });
  }
  delete uri.source;
  return uri;
}

// See `parse_url` above
var MONGO_PARSED = parse_url(process.env.MONGOHQ_URL);

var config = {
  detailedErrors: false
, hostname: "0.0.0.0"
, port: process.env.PORT || 4000
, model: {
    defaultAdapter: 'mongo'
  }
, db: {
    mongo: {
      username: MONGO_PARSED.user
    , dbname: MONGO_PARSED.path.substring(1)    // Get rid of the leading `/`
    , password: MONGO_PARSED.pass
    , host: MONGO_PARSED.host
    , port: parseInt(MONGO_PARSED.port)
    }
  }
, sessions: {
		store: 'cookie'
	, key: 'did'
	, expiry: 14 * 24 * 60 * 60
	}
	
};

module.exports = config;


