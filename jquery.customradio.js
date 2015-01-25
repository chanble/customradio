(function($){
	$.fn.customRadio = function(opts){
		return new CustomRadio($(this), opts);
	};
	function CustomRadio(el, opts){
		var that = this;
		var defaultOpts = {
			//data中的value和html分别对应value和html的值
			'data' : [
				{'value': '1', 'html' : '第一个'},
				{'value': '2', 'html' : '第二个第二个第二个第二个'},
				{'value': '3', 'html' : '第三个'}
			],//string类型的值会被认为是地址
			'value' : 'value',
			'html' : 'html',
			'name' : 'bxdcustomradio',
			'id' : 'bxdcustomradio',
			'onChange' : function(){
				console.log('change');
			},
			//插件加载完成时
			'onDone': function(){
				console.log('done');
			}
		};

		this.getOnItem = function(){
			return onitem;
		};
		//默认通过值来设置选中框
		this.setItemOn = function(v){
			return setOn(that.el.children('span.cb_customradio_item[crvalue="'+ v +'"]'));
		};
		this.setItemOnByIndex = function(index){
			return setOn($(itemList[index]));
		};
		this.val = function(){
			return crinput.val();
		}
		this.options = $.extend(false,defaultOpts, opts);
		this.el = el;
		var itemList,crinput,onitem;
		init();

		function init(){
			crinput = $('<input type="hidden">');
			var hsubmitName = trim(that.options.name);
			var helementId = trim(that.options.id);
			if(hsubmitName.length > 0){
				crinput.attr('name', hsubmitName);
			}
			if(helementId.length > 0){
				crinput.attr('id', helementId);
			}
			that.el.append(crinput);
			var itemListText = '';
			for(var i = 0; i < that.options.data.length; i++){
				itemListText += '<span class="cb_customradio_item" crvalue="'
					+ that.options.data[i][that.options.value] + '"><i><em></em></i>'
					+ that.options.data[i][that.options.html] +'</span>';
			}
			itemList = $(itemListText);
			that.el.append(itemList);
			itemList.click(function(){
				setOn($(this));
			});
			that.setItemOnByIndex(0);
			that.options.onDone.call(that);
		}
		function trim(str){
			if(!str){
				return '';
			}else{
				return str.replace(/(^\s*)|(\s*$)/g, '');
			}
		}
		function setOn(jobj){
			if(onitem != jobj){
				crinput.val(jobj.attr('crvalue'));
				that.el.find('span.cb_customradio_item.on').removeClass('on');
				jobj.addClass('on');
				onitem = jobj;
				setTimeout(function(){
					that.options['onChange'].call(that);
				}, 100);
			}
			return that;
		}
	}
})(jQuery);
