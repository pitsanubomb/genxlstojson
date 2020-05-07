class xlsToJson {

  async convertoJson(file) {
    var data = await this.readUploadedFileAsText(file.target.files[0]);
    var res = this.xlsRender(data);
    var newRes = this.xlsRenderJson(res);
    return newRes;
  }

  readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsArrayBuffer(inputFile);
    });
  };

  xlsRender(data) {
    var X = XLSX;
    var res = X.read(data, { type: 'array' });
    return res;
  }
  xlsRenderJson(workbook) {
    var loop = workbook.SheetNames;
    var sheet = workbook.Sheets;
    var result = {};
    loop.forEach(sheetname => {
      var checkflag = XLSX.utils.sheet_to_json(sheet[sheetname], { header: 1 })
      if (checkflag.length) result[sheetname] = checkflag;
    });
    return result;
  }
} 