import React, { Component } from 'react';

class AboutZH extends Component {
  render() {
    return (

      <div className="textPage">
      <h1>关于该项目</h1>
        <p>对中国基督教的历史研究面临许多挑战，这些挑战使得以经验为驱动力和元层次的分析形式似乎变得不可能。 资源的不同性质，技术障碍以及基督教本身的“外国”地位，使得这种形式的分析令人生畏。 但是，中国历史基督教数据库（CHCD）是一个旨在克服这些障碍的新项目。 通过建立战略合作伙伴关系，创新的在线工具以及最先进的地理和关系数据库，CHCD有望创建一个领域变化的资源，从而在支持过去几十年的进展的同时，开辟新的分析水平。 </ p>

      <div className="divider"></div>

      <h2>项目目标</h2>

      <h3>创建地理和关系数据库</ h3>
        <p>该数据库将灵活地设计，并允许学生和学者追踪16世纪至20世纪间中国的基督教徒，机构，组织和事件。没有历史数据库可以详尽无遗。但是，CHCD旨在捕获尽可能广泛的数据。这种广泛的方法将能够对基督教徒的存在进行统计分析，这是迄今为止不可能的。</ p>
      <h3>创建用户友好的在线平台</ h3>
        <p>与数据同等重要，该项目旨在通过用户友好的在线平台（包括文本搜索和地理可视化）使学生，教师和研究人员尽可能地访问数据。完成后，该工具将提供中英文两种语言。</ p>
      <h3>中西大学之间的伙伴关系</ h3>
        <p>该项目旨在汇聚来自中西研究大学的多个团队。通过共同收集和分析数据，该项目提供了一个克服历史来源复杂性的机会，同时创造了相互丰富的机会。此外，该项目的数据驱动方法论使来自不同学科和领域的学者能够参与该项目。</ p>

      <div className="divider"></div>

      <h2>项目团队</h2>

        <div className="float-left">
          <img src="..\src\Assets\images\eugenio.jpg" className="bio-pic" alt=""/>
          <h3>Eugenio Menegon</h3>
          <h4>首席研究员</ h4>
            <p>Eugenio Menegon (B.A. University of Venice Ca’ Foscari, Italy; M.A. & Ph.D. University of California at Berkeley, USA) 在波士顿大学历史系教授中国历史和世界历史，并于2012-2015年担任波士顿大学亚洲研究中心主任。他的兴趣包括帝制晚期的中西关系，中国的宗教和基督教，中国科学， 他曾是比利时鲁汶大学（Kateholieke Leuven）的中国研究科学家，哈佛大学费尔班克中国研究中心的王安博士后任命，波士顿大学人文中心的资深 专家，历史研究学院成员普林斯顿大学高级研究所教授，以及波士顿学院高级耶稣会研究所高级官员，他目前是该学院的合作学者。</ p>
        </div>

        <div className="float-left">
          <img src="..\src\Assets\images\daryl.jpg" className="bio-pic" alt=""/>
          <h3>Daryl Ireland</h3>
          <h4>首席研究员</ h4>
          <p>爱尔兰达里尔（Daryl Ireland）(B.A. Wheaton College; M.Div. & M.A. Nazarene Theological Seminary; Ph.D. Boston University) 是全球基督教与传教中心的副主任，以及传教的研究助理教授。 达里尔（Daryl）是拿撒勒教会的受命牧师，曾在亚洲，欧洲和美国担任过各种职务。 他的研究兴趣集中在东亚的基督教周围，尤其是中国和东南亚的复兴运动。</ p>
        </div>

        <div className="float-left">
          <img src="..\src\Assets\images\alex.jpg" className="bio-pic" alt=""/>
          <h3>Alex Mayfield</h3>
          <h4>专案经理</h4>
          <p> Alex Mayfield (B.A. Oral Roberts University; M.Div. Boston College) 是一名博士学位。 波士顿大学神学院的候选人。 他的研究兴趣包括全球五旬节运动和超凡魅力运动，普世主义，亚洲传教的历史以及近代中国基督教的发展。 除了这些兴趣之外，Alex还致力于一些数字计划，旨在弥合神学院与广大公众之间的鸿沟。</ p>
        </div>

        <div className="divider"></div>

        <h2>研究助理</h2>

          <div className="float-left">
            <img src="..\src\Assets\images\aaron.jpg" className="bio-pic-small" alt=""/>
            <h3>Aaron Liew</h3>
            <p>亚伦·刘（Aaron Liew）毕业于圣十字学院，在那里他主修中文和历史。 他目前正计划获得中国历史学硕士学位。</ p>
          </div>

          <div className="float-left">
            <img src="..\src\Assets\images\david.jpg" className="bio-pic-small" alt=""/>
            <h3>David Li</h3>
            <p> David Li是波士顿大学历史专业的高级课程。 他出生于新西兰，在中国广东长大。 他的专业兴趣包括汉语词源和方言（他知道其中的三个），这促使他参加了这个数字人文项目，以利用他在中国历史和语言上的知识。</ p>
          </div>

      </div>

    );
  }
}

export default AboutZH;
