import React, { Component } from 'react';

class DataTW extends Component {
  render() {
    return (

      <div className="textPage">
      <h1>數據中心</h1>
        <p>此在線平台只是對中國歷史基督教數據庫（CHCD）中收集的數據可以做的一種表達。為了使用其他數字工具或進行更複雜的統計分析，需要下載數據。該頁麵包含鏈接和文檔，可幫助您了解數據庫的結構，名稱和構建數據庫的技術。</p>

      <h2>下載CHCD</h2>
        <p>中國歷史數據庫致力於數據可訪問性和開放式獎學金。但是，收集，清理和組織歷史數據的過程必然需要不斷完善。這樣，該項目將發布其數據的定期更新。每次更新都會記錄自上次更新以來收集了哪些數據以及進行了哪些更改。使用下面的鏈接下載最新的數據集。</p>
        <form action="https://www.google.com" method="get" target="_blank">
          <button type="submit" className="download">下載最新版本的CHCD</button>
         </form>
      <h2>文獻資料</h2>
        <p> 這些文檔提供了數據庫或數據庫各個方面的技術概述。</p>
        <ul>
          <li><a href="">CHCD白皮書</a></li>
          <li><a href="">CHCD來源索引</a></li>
        </ul>
      <h2>Neo4j圖形數據庫平台</h2>
        <p>CHCD利用開源圖形數據庫平台Neo4j來運行其數據庫。 儘管可以將數據移植到其他數據庫格式中，但是對Neo4j的一些熟悉可能會有所幫助。 <a href="https://neo4j.com/">單擊此處以了解有關Neo4j的更多信息。</a></p>
      </div>

    );
  }
}

export default DataTW;
