const JH_datepicker = (function () {
    function JH_datepicker (x,y,targetDate,button,limitStartDate=null,limitEndDate=null) {
        this.xPoint = x
        this.yPoint = y
        this.containDiv = null
        this.targetDate = targetDate
        if(limitStartDate>limitEndDate) {
            throw console.error("Limit date error!")
        }
        this.isLimit = !!(limitStartDate || limitEndDate);
        this.limitStartDate = limitStartDate
        this.limitEndDate = limitEndDate
        this.paint(targetDate)
    }

    JH_datepicker.prototype.paint = function (Date) {
        if(Date) {
            this.targetDate = Date
        }

        let body = document.getElementsByTagName("body")[0]

        let prevModal = document.getElementsByClassName("jh_datepicker_div")[0]
        if(prevModal) {
            prevModal.remove()
        }
        let datepickerContainerDiv = document.createElement("div")
        this.containDiv = datepickerContainerDiv
        datepickerContainerDiv.classList.add("jh_datepicker_div")
        datepickerContainerDiv.style.left = this.xPoint-100+"px"
        datepickerContainerDiv.style.top = this.yPoint+"px"

        // let deleteDiv = document.createElement("div")
        // deleteDiv.classList.add("jh_datepicker_delete_container_div")
        //
        // let deleteButton = document.createElement("span")
        // deleteButton.innerText = "X"
        // deleteButton.classList.add("jh_datepicker_delete_span")
        // deleteButton.addEventListener("click",function (event) {
        //     event.currentTarget.parentNode.remove()
        // })
        // deleteDiv.appendChild(deleteButton)
        // datepickerContainerDiv.appendChild(deleteDiv)

        let datepickerTable = document.createElement("table")
        datepickerTable.classList.add("jh_datepicker_div_table")

        this.drawTable(datepickerTable)

        datepickerContainerDiv.appendChild(datepickerTable)
        body.appendChild(datepickerContainerDiv)

        return datepickerContainerDiv
    }

    JH_datepicker.prototype.drawTable = function (table) {

        let thead = document.createElement("thead")
        thead.classList.add("jh_datepicker_div_table_thead")
        let titleArrowTr = document.createElement("tr")
        let leftArrowTd = document.createElement("td")
        leftArrowTd.innerHTML = "<"
        leftArrowTd.classList.add("jh_datepicker_div_table_thead_prev")
        leftArrowTd.addEventListener("click",this.prevMonthEvent.bind(this))

        let rightArrowTd = document.createElement("td")
        rightArrowTd.innerHTML = ">"
        rightArrowTd.classList.add("jh_datepicker_div_table_thead_after")
        rightArrowTd.addEventListener("click",this.nextMonthEvent.bind(this))

        let currentMonthViewTd = document.createElement("td")
        currentMonthViewTd.colSpan = 4
        currentMonthViewTd.innerHTML = this.targetDate.getFullYear()+"년 "+(this.targetDate.getMonth()+1)+"월"

        let deleteDatepicker = document.createElement("td")
        deleteDatepicker.innerText = "X"
        deleteDatepicker.classList.add("jh_datepicker_div_table_thead_delete")
        deleteDatepicker.addEventListener("click",function (event) {
            event.currentTarget.parentNode.parentNode.parentNode.parentNode.remove()
        })

        titleArrowTr.appendChild(leftArrowTd)
        titleArrowTr.appendChild(currentMonthViewTd)
        titleArrowTr.appendChild(rightArrowTd)
        titleArrowTr.appendChild(deleteDatepicker)

        let dayHeadTr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.innerText = "일"
        td1.classList.add("jh_datepicker_div_table_thead_sun")

        let td2 = document.createElement("td")
        td2.innerText = "월"

        let td3 = document.createElement("td")
        td3.innerText = "화"

        let td4 = document.createElement("td")
        td4.innerText = "수"

        let td5 = document.createElement("td")
        td5.innerText = "목"

        let td6 = document.createElement("td")
        td6.innerText = "금"

        let td7 = document.createElement("td")
        td7.innerText = "토"
        td7.classList.add("jh_datepicker_div_table_thead_sat")

        dayHeadTr.appendChild(td1)
        dayHeadTr.appendChild(td2)
        dayHeadTr.appendChild(td3)
        dayHeadTr.appendChild(td4)
        dayHeadTr.appendChild(td5)
        dayHeadTr.appendChild(td6)
        dayHeadTr.appendChild(td7)

        thead.appendChild(titleArrowTr)
        thead.appendChild(dayHeadTr)

        table.append(thead)

        let tbody = document.createElement("tbody")
        this.drawTbody(tbody)

        table.append(tbody)
    }

    JH_datepicker.prototype.drawTbody = function (tbody) {
        let targetMonthFirstDay = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth(), 1);
        let targetMonthLastDay = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth()+1, 0);

        let cnt = 0
        let day = 1
        let firstRow = document.createElement("tr")
        for(let i=0;i<targetMonthFirstDay.getDay();i++) {
            let tempTd = document.createElement("td")
            firstRow.appendChild(tempTd)
            cnt += 1
        }
        for(let i=targetMonthFirstDay.getDay();i<=6;i++) {
            let tempTd = document.createElement("td")
            if(cnt%7===0) {
                tempTd.classList.add("jh_datepicker_div_table_thead_sun")
            }
            if(cnt%7===6) {
                tempTd.classList.add("jh_datepicker_div_table_thead_sat")
            }
            tempTd.classList.add("jh_datepicker_div_table_tbody_td")

            let tempTdDate = new Date(targetMonthFirstDay.getFullYear(),targetMonthFirstDay.getMonth(),day)
            if(this.isLimit && (tempTdDate<this.limitStartDate || tempTdDate>this.limitEndDate)) {
                tempTd.classList.add("disabled")
            }
            else {
                tempTd.addEventListener("click",this.dailySelectEvent.bind(this))
            }
            tempTd.setAttribute("id","datapicker-"+targetMonthFirstDay.getFullYear()+"-"+targetMonthFirstDay.getMonth()+"-"+day)
            tempTd.innerText = day.toString()
            firstRow.appendChild(tempTd)
            day += 1
            cnt += 1
        }
        tbody.appendChild(firstRow)

        let tempTr;
        for(;day<=targetMonthLastDay.getDate();day++, cnt++) {
            if(cnt%7===0) {
                tempTr = document.createElement("tr")
            }
            let tempTd = document.createElement("td")
            if(cnt%7===6) {
                tempTd.classList.add("jh_datepicker_div_table_tbody_sat")
            }
            if(cnt%7===0) {
                tempTd.classList.add("jh_datepicker_div_table_tbody_sun")
            }
            tempTd.classList.add("jh_datepicker_div_table_tbody_td")
            let tempTdDate = new Date(targetMonthFirstDay.getFullYear(),targetMonthFirstDay.getMonth(),day)
            if(this.isLimit && (tempTdDate<this.limitStartDate || tempTdDate>this.limitEndDate)) {
                tempTd.classList.add("disabled")
            }
            else {
                tempTd.addEventListener("click",this.dailySelectEvent.bind(this))
            }
            tempTd.setAttribute("id","datapicker-"+targetMonthFirstDay.getFullYear()+"-"+targetMonthFirstDay.getMonth()+"-"+day)
            tempTd.innerText = day.toString()
            tempTr.appendChild(tempTd)
            if(cnt%7===0) {
                tbody.appendChild(tempTr)
            }

        }
    }

    JH_datepicker.prototype.prevMonthEvent = function (event) {
        let newTarget = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth() - 1, this.targetDate.getDate())
        this.paint(newTarget)
    }

    JH_datepicker.prototype.nextMonthEvent = function (event) {
        let newTarget = new Date(this.targetDate.getFullYear(), this.targetDate.getMonth() + 1, this.targetDate.getDate())
        this.paint(newTarget)
    }

    JH_datepicker.prototype.getDay = function (day) {

    }

    JH_datepicker.prototype.dailySelectEvent = function (event) {
        let dayID = event.currentTarget.getAttribute("id");

        let dayStr = dayID.split("-")
        this.getDay(new Date(dayStr[1],dayStr[2],dayStr[3]))
        this.containDiv.remove()
    }

    return JH_datepicker
}())