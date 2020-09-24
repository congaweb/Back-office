$(function () {
	$('.deapth1>li').each(function (index, dom) {
		if ($(dom).hasClass('on')) {
			$(dom).find('.deapth2').show();
		}
	});
	
	// gnb
	$('.deapth1 .item').click(function () {
		$('.deapth1>li').removeClass('on');
		$(this).parent().addClass('on');
		$('.deapth2').stop().slideUp();
		$(this).next().stop().slideDown();
	});

	// select-box custom
	var selectTarget = $('.select-box select');

	selectTarget.change(function () {
		var selectName = $(this).children('option:selected').text();
		$(this).siblings('label').text(selectName);
	});

	// checkbox
	// var checkbox = $('.checkbox');
	var checkAll = $('#checkall');
	var targetCheckbox = $('table tbody .checkbox');
	var targetLength = targetCheckbox.length;

	targetCheckbox.on('click', function () {
		if ($(this).prop('checked')) {
			$(this).parent('.fake-checkbox').addClass('checked');
		} else {
			$(this).parent('.fake-checkbox').removeClass('checked');
		}
		setAllCheckbox();
	});

	checkAll.on('click', function () {
		if ($(this).prop('checked')) {
			$('input[name=chk]').prop('checked', true);
			$('input[name=chk]').parent('.fake-checkbox').addClass('checked');
			$(this).prop('checked', true);
			$(this).parent().addClass('checked');
		} else {
			$('input[name=chk]').prop('checked', false);
			$('input[name=chk]').parent('.fake-checkbox').removeClass('checked');
			$(this).prop('checked', false);
			$(this).parent().removeClass('checked');
		}
	});

	function setAllCheckbox(){
		var getChecked = $('table tbody .checkbox:checked');
		var getCheck = getChecked.length;
		if (targetLength == getCheck) {
			checkAll.prop('checked', true);
			checkAll.parent().addClass('checked');
		} else {
			checkAll.prop('checked', false);
			checkAll.parent().removeClass('checked');
		}
	}

	// pagination
	var pageNum = $('.pagination a')
	pageNum.click(function(e){
		e.preventDefault();
		pageNum.removeClass('current');
		$(this).addClass('current');
	});

	// Date picker
	$('#datepicker').datepicker({
		language: 'ko-KR',
		autoHide: true,
	});

	$('#start-date').datepicker({
		language: 'ko-KR',
		autoHide:true,
	});

	$('#end-date').datepicker({
		language: 'ko-KR',
		autoHide:true,
	});

	$(document).on('change', '#start-date', (e) => {
		e.preventDefault();
		//Get text values for depart and return
		var departText = $(e.target).val();
		var returnText = $('#end-date').val();
		//Get dates for depart and return
		var departDate = new Date(departText);
		var returnDate = new Date(returnText);
		//If retrun date is blank or before depart date configure the calendar end delete textbox value
		if (returnText == '' || returnDate < departDate) {
			$('#end-date').datepicker('setStartDate', departText);
			$('#end-date').datepicker('setDate', departText);
			$('#end-date').val('');
		} else if (returnDate > departDate) {
			$('#end-date').datepicker('setStartDate', departText);
		}
	});
}); //E

// 첨부파일 라인 추가 및 삭제
var fileIndex = $(document).find('div.addfiles').length;
var addFiles = {
	add: function (e) {
		fileIndex = $(e).parents('td').find('div.addfiles:last').attr('data-fileNum') + 1;

		var addTarget = $(e);
		fileIndex++;
		addTarget
			.parents('td')
			.append(
				'<div class="addfiles" data-fileNum="' + fileIndex + '">' +
					'<input type="file" id="file-upload-addfile' + fileIndex + '" name="attachFile[]" class="blind" onchange="fileUpload.add(this)">' +
					'<span class="filepath input"></span>' +
					'<label for="file-upload-addfile' + fileIndex + '" class="button small">찾기</label>' +
					'<button type="button" class="button small remove-file" onclick="addFiles.del(this);">-</button>' +
					'</div>',
			);
	},
	del: function (e) {
		var removeTarget = $(e);
		removeTarget.closest('.addfiles').remove();
	},
};

// 단일 파일 파일명 추출 및 삭제
var fileUpload = {
	add: function (e) {
		var addTarget = $(e);

		addTarget.next('.filepath').text('');
		if (window.FileReader) {
			var filename = addTarget[0].files[0].name;
		} else {
			var filename = addTarget.val().split('/').pop().split('\\').pop();
		}
		addTarget.next('.filepath').text(filename);
	},
	del: function (e) {
		var delTarget = $(e);
		var delFile = delTarget.siblings('input[type=file]');

		delTarget.siblings('.filepath').text('');
		delFile.val('');
	},
};

// 멀티 파일 업로드
var multiImage = {
	addImage: function (e) {
		var imageTarget = e;
		var imageList = imageTarget.files;
		var listLength = imageList.length;

		$('.mutifiles p').remove();
		for (i = 0; i < listLength; i++) {
			var imageName = imageList[i];
			$('.mutifiles').append('<p>' + imageName.name + '</p>');
		}
	},
};

// With US 및 협력기관 리스트 추가
var addList = {
	addWith: function (e) {
		var addTarget = $(e);
		addTarget
			.closest('tbody')
			.append(
				'<tr class="addlist-wrap">' +
					'<td>' +
					'<span class="input is-expend">' +
					'<input type="text">' +
					'</span>' +
					'</td>' +
					'<td>' +
					'<span class="input is-expend">' +
					'<input type="text">' +
					'</span>' +
					'</td>' +
					'<td>' +
					'<div class="addlist">' +
					'<span class="input is-expend">' +
					'<input type="text">' +
					'</span>' +
					'<button type="button" class="button small remove-file" onclick="addList.del(this)">-</button>' +
					'</div>' +
					'</td>' +
					'</tr>',
			);
	},
	addCompany: function (e) {
		var addTarget = $(e);
		addTarget
			.closest('tbody')
			.append(
				'<tr class="addlist-wrap">' +
					'<td>' +
					'<span class="input is-expend">' +
					'<input type="text">' +
					'</span>' +
					'</td>' +
					'<td>' +
					'<div class="addlist">' +
					'<span class="input is-expend">' +
					'<input type="text">' +
					'</span>' +
					'<button type="button" class="button small remove-file" onclick="addList.del(this)">-</button>' +
					'</div>' +
					'</td>' +
					'</tr>',
			);
	},
	del: function (e) {
		var removeTarget = $(e);
		removeTarget.closest('.addlist-wrap').remove();
	},
};
