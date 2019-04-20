const generateTable = () => {
	let tableDiv = document.getElementById('myDynamicTable');
	let table = document.createElement('TABLE');
	table.border = '1';
	table.id = 'table'
	let tableBody = document.createElement('TBODY');
	table.appendChild(tableBody);
	for (let i = 0; i < 37; i++) { // table row must be divisible by 10 
		let tr = document.createElement('TR');
		if (i === 0) {
			tr.style.display = 'none'; // hide first <tr> 
		}
		tableBody.appendChild(tr);
		for (let j = 0; j < 29; j++) { // table row must be divisible by 10   
			let td = document.createElement('TD');
			td.width = '20';
			if (i !== 0 && j !== 0) {
				td.classList.add('color');
				td.value = 'open';
			} else {
				td.style.display = 'none'; // hide first column of <td>'s '
			}
			tr.appendChild(td);
		}
	}
	tableDiv.appendChild(table);
}

function colorTable(args, color) {
	for(let i = 0; i < args.length; i++){
   	args[i].style.backgroundColor = color;
	}
}

export {generateTable, colorTable};
