import React, { Component } from 'react';

class AboutTW extends Component {
  render() {
    return (

      <div className="textPage">
      <h1>關於該項目</h1>
        <p>對中國基督教的歷史研究面臨許多挑戰，這些挑戰使得以經驗為驅動力和元層次的分析形式似乎變得不可能。 資源的不同性質，技術障礙以及基督教本身的“外國”地位，使得這種形式的分析令人生畏。 但是，中國歷史基督教數據庫（CHCD）是一個旨在克服這些障礙的新項目。 通過建立戰略合作夥伴關係，創新的在線工具以及最先進的地理和關係數據庫，CHCD有望創建一個領域變化的資源，從而打開新的分析水平，同時支持過去幾十年取得的進展。 </ p>

      <div className="divider"></div>

      <h2>項目目標</h2>

      <h3>創建地理和關係數據庫</ h3>
        <p>該數據庫將靈活地設計，並允許學生和學者追踪16世紀至20世紀間中國的基督教徒，機構，組織和事件。沒有歷史數據庫可以詳盡無遺。但是，CHCD旨在捕獲盡可能廣泛的數據。這種廣泛的方法將能夠對基督教徒的存在進行統計分析，這是迄今為止不可能的。</ p>
      <h3>創建用戶友好的在線平台</ h3>
        <p>與數據同等重要，該項目旨在通過用戶友好的在線平台（包括文本搜索和地理可視化）使學生，教師和研究人員盡可能地訪問數據。完成後，該工具將提供中英文兩種語言。</ p>
      <h3>中西大學之間的伙伴關係</ h3>
        <p>該項目旨在匯聚來自中西研究大學的多個團隊。通過共同收集和分析數據，該項目提供了一個克服歷史來源複雜性的機會，同時創造了相互豐富的機會。此外，該項目的數據驅動方法論使來自不同學科和領域的學者能夠參與該項目。</ p>

      <div className="divider"></div>

      <h2>項目團隊</h2>

        <div className="float-left">
          <img src="..\src\Assets\images\eugenio.jpg" className="bio-pic" alt=""/>
          <h3>Eugenio Menegon</h3>
          <h4>首席研究員</ h4>
          <p> Eugenio Menegon (B.A. University of Venice Ca’ Foscari, Italy; M.A. & Ph.D. University of California at Berkeley, USA) 在波士頓大學歷史系教授中國歷史和世界歷史，並於2012-2015年擔任波士頓大學亞洲研究中心主任。他的興趣包括帝制晚期的中西關係，中國的宗教和基督教，中國科學， 他曾是比利時魯汶大學（Kateholieke Leuven）的中國研究科學家，哈佛大學費爾班克中國研究中心的王安博士後任命，波士頓大學人文中心的資深 專家，歷史研究學院成員普林斯頓大學高級研究所教授，以及波士頓學院高級耶穌會研究所高級官員，他目前是該學院的合作學者。</ p>
        </div>

        <div className="float-left">
          <img src="..\src\Assets\images\daryl.jpg" className="bio-pic" alt=""/>
          <h3>Daryl Ireland</h3>
          <h4>首席研究員</ h4>
          <p>愛爾蘭達里爾（Daryl Ireland）(B.A. Wheaton College; M.Div. & M.A. Nazarene Theological Seminary; Ph.D. Boston University) 是全球基督教與傳教中心的副主任，以及傳教的研究助理教授。 達里爾（Daryl）是拿撒勒教會的受命牧師，曾在亞洲，歐洲和美國擔任過各種職務。 他的研究興趣集中在東亞的基督教周圍，尤其是中國和東南亞的複興運動。</ p>
        </div>

        <div className="float-left">
          <img src="..\src\Assets\images\alex.jpg" className="bio-pic" alt=""/>
          <h3>Alex Mayfield</h3>
          <h4>專案經理</h4>
          <p> Alex Mayfield (B.A. Oral Roberts University; M.Div. Boston College) 是一名博士學位。 波士頓大學神學院的候選人。 他的研究興趣包括全球五旬節運動和超凡魅力運動，普世主義，亞洲傳教的歷史以及近代中國基督教的發展。 除這些興趣外，Alex還致力於一些數字計劃，旨在彌合神學院與廣大公眾之間的鴻溝。</ p>
        </div>

        <div className="divider"></div>

        <h2>研究助理</h2>

          <div className="float-left">
            <img src="..\src\Assets\images\aaron.jpg" className="bio-pic-small" alt=""/>
            <h3>Aaron Liew</h3>
            <p>亞倫·劉（Aaron Liew）畢業於聖十字學院，在那裡他主修中文和歷史。 他目前正計劃獲得中國歷史學碩士學位。</ p>
          </div>

          <div className="float-left">
            <img src="..\src\Assets\images\david.jpg" className="bio-pic-small" alt=""/>
            <h3>David Li</h3>
            <p> David Li是波士頓大學歷史專業的高級課程。 他出生於新西蘭，在中國廣東長大。 他的專長包括中國的詞源和方言（他知道其中的三個），這使他參加了這個數字人文項目，以利用他在中國歷史和語言方面的知識。</ p>
          </div>

      </div>

    );
  }
}

export default AboutTW;
