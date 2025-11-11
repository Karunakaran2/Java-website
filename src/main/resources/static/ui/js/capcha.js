   $(document).on('click', '.reloadCaptcha', function(event) {
			$("input[name='captcha']").val("");
			var captchaUrl=/*[[@{/captcha/getCaptcha}]]*/ 'captcha/getCaptcha';
			$("#captchaIdentifier").attr("src", captchaUrl+"?id=" + new Date().getTime());
		});