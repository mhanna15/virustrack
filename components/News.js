import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Linking,
  Image,
} from "react-native";

import { Card, ListItem, Icon } from 'react-native-elements'
import { Divider } from 'react-native-elements';


import Header from "./Header";

const News = (props) => {
  // const [articles, setArticles] = useState([]);

  // const handleNewsFetch = () => {
  //   fetch("http:localhost:3000/articles")
  //     .then((r) => r.json())
  //     .then((r) => {
  //       for (var i = 0; i < r.length; i++) {
  //         setArticles(...articles, r);
  //       }
  //     });
  // };

  const articles = [
    {
        "id": 1,
        "source": "Nytimes.com",
        "author": "David Waldstein",
        "title": "David Waldstein",
        "description": "One sick singer attended choir practice, infecting 53 others, two of whom died. A study released by the C.D.C. shows that self-isolation and tracing efforts helped contain the outbreak.",
        "url": "https://www.nytimes.com/2020/05/12/health/coronavirus-choir.html",
        "image_url": "https://static01.nyt.com/images/2020/05/12/multimedia/12virus-choir/12virus-choir-facebookJumbo.jpg",
        "date": "2020-05-13T00:41:23Z",
        "content": "It was a chilly evening in Mount Vernon, Wash., on March 10, when a group of singers met for choir practice at their church, just as they did most Tuesday nights.\r\nThe full choir consists of 122 singers, but only 61 made it that night, including one who had b… [+5509 chars]",
        "created_at": "2020-05-13T04:18:36.996Z",
        "updated_at": "2020-05-13T04:18:36.996Z"
    },
    {
        "id": 2,
        "source": "Youtube.com",
        "author": null,
        "title": null,
        "description": "Spokesman Dmitry Peskov announced today he’s been hospitalized along with his wife. He described his condition as stable and said he hasn’t seen Putin in a m...",
        "url": "https://www.youtube.com/watch?v=D4cWJ_eB1DE",
        "image_url": "https://i.ytimg.com/vi/D4cWJ_eB1DE/maxresdefault.jpg",
        "date": "2020-05-13T00:09:45Z",
        "content": "Spokesman Dmitry Peskov announced today hes been hospitalized along with his wife. He described his condition as stable and said he hasnt seen Putin in a month.» Subscribe to NBC News: http://nbcnews.to/SubscribeToNBC» Watch more NBC video: http://bit.ly/More… [+878 chars]",
        "created_at": "2020-05-13T04:18:37.001Z",
        "updated_at": "2020-05-13T04:18:37.001Z"
    },
    {
        "id": 3,
        "source": "Npr.org",
        "author": "Se Eun Gong",
        "title": "Se Eun Gong",
        "description": "The country had prepared to welcome students back to classrooms on Wednesday, but dozens of new virus cases linked to nightclubs in Seoul have emerged.",
        "url": "https://www.npr.org/sections/coronavirus-live-updates/2020/05/12/854407305/south-korea-delays-reopening-schools-as-coronavirus-cases-resurge",
        "image_url": "https://media.npr.org/assets/img/2020/05/12/rtx7ieec-edit_wide-837fe533329f759664c93f408315b5e10b985092.jpg?s=1400",
        "date": "2020-05-12T23:50:43Z",
        "content": "A person sprays disinfectant at a high school amid the coronavirus outbreak on Monday, in Seoul, South Korea.\r\nYonhap News Agency via Reuters\r\nSouth Korea has delayed reopening schools another week as dozens of new coronavirus cases linked to nightclubs in Se… [+2800 chars]",
        "created_at": "2020-05-13T04:18:37.005Z",
        "updated_at": "2020-05-13T04:18:37.005Z"
    },
    {
        "id": 4,
        "source": "USA Today",
        "author": "Maureen Groppe, Michael Collins",
        "title": "Maureen Groppe, Michael Collins",
        "description": "Anthony Fauci, other public health officials warn that while containment measures are working, the coronavirus is not yet under control.",
        "url": "https://www.usatoday.com/story/news/politics/2020/05/12/coronavirus-fauci-issues-stark-warning-disease-odds-trump/3117983001/",
        "image_url": "https://www.gannett-cdn.com/presto/2020/05/12/USAT/c3cbda84-c64f-474d-bffe-914098026b04-VPC_FAUCI_SOT_DESK_THUMB.00_01_45_29.Still004.jpg?crop=1911,1075,x8,y0&width=1600&height=800&fit=bounds",
        "date": "2020-05-12T23:44:03Z",
        "content": "Dr. Anthony Fauci told senators \"it is without a doubt that there will be infections\" in the fall and warned of more deaths without adequate response.\r\nUSA TODAY\r\nWASHINGTON Top public health officials, as well as a few Democratic and Republican senators, pai… [+8561 chars]",
        "created_at": "2020-05-13T04:18:37.009Z",
        "updated_at": "2020-05-13T04:18:37.009Z"
    },
    {
        "id": 5,
        "source": "Knoe.com",
        "author": "KNOE",
        "title": "KNOE",
        "description": "Retail giant Walmart will once again provide bonuses to employees working during the coronavirus pandemic.",
        "url": "https://www.knoe.com/content/news/Walmart-to-give-another-round-of-bonuses-to-employees-amid-COVID-19-pandemic-570412491.html",
        "image_url": "https://media.graytvinc.com/images/Walmart+STILL1.jpg",
        "date": "2020-05-12T21:17:56Z",
        "content": "BENTONVILLE, Ark. (Gray News) - Retail giant Walmart will once again provide bonuses to employees working during the coronavirus pandemic.\r\nThe company announced Tuesday it will hand out $300 bonuses for full-time hourly workers and $150 for part-time hourly … [+870 chars]",
        "created_at": "2020-05-13T04:18:37.012Z",
        "updated_at": "2020-05-13T04:18:37.012Z"
    },
    {
        "id": 6,
        "source": "The Washington Post",
        "author": "Lori Aratani, Ian Duncan",
        "title": "Lori Aratani, Ian Duncan",
        "description": "Consumers say airlines are unfairly denying them refunds for canceled flights.",
        "url": "https://www.washingtonpost.com/local/trafficandcommuting/consumer-complaints-to-transportation-department-about-airlines-have-skyrocketed-during-coronavirus-pandemic/2020/05/12/fae178e6-9457-11ea-82b4-c8db161ff6e5_story.html",
        "image_url": "https://www.washingtonpost.com/resizer/WQ-4W6fnLFykqNIxMyYx9NQRnhw=/1440x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/3ZCM5REUPUI6VAVUZDNRMH7W4U.jpg",
        "date": "2020-05-12T21:13:41Z",
        "content": "The enforcement notice issued by the department Tuesday its second does not guarantee consumers will receive refunds, but offers them additional information about their rights. It also puts airlines on notice about their obligations to consumers and reminds t… [+4873 chars]",
        "created_at": "2020-05-13T04:18:37.016Z",
        "updated_at": "2020-05-13T04:18:37.016Z"
    },
    {
        "id": 7,
        "source": "Latimes.com",
        "author": "Colleen Shalby",
        "title": "Colleen Shalby",
        "description": "Los Angeles County's stay-at-home orders will 'with all certainty' be extended for the next three months, Public Health Director Barbara Ferrer said.",
        "url": "https://www.latimes.com/california/story/2020-05-12/coronavirus-beaches-reopen-los-angeles-county-move-toward-new-normal",
        "image_url": "https://ca-times.brightspotcdn.com/dims4/default/c187b38/2147483647/strip/true/crop/3000x1575+0+213/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc5%2Fcb%2F667495f84449babe5e17e54776be%2Fla-me-coronavirus-air-quality.09.JPG",
        "date": "2020-05-12T20:11:00Z",
        "content": "Los Angeles Countys stay-at-home orders will with all certainty be extended for the next three months, county Public Health Director Barbara Ferrer acknowledged during a Board of Supervisors meeting on Tuesday.\r\nFerrer, though she didnt issue an official orde… [+5026 chars]",
        "created_at": "2020-05-13T04:18:37.019Z",
        "updated_at": "2020-05-13T04:18:37.019Z"
    },
    {
        "id": 8,
        "source": "Reuters",
        "author": "Stephen Grey",
        "title": "Stephen Grey",
        "description": "At least 20,000 people have died in care homes in England and Wales as a consequence of the coronavirus pandemic, according to Reuters calculations based on official data.",
        "url": "https://www.reuters.com/article/us-health-coronavirus-britain-carehomes-idUSKBN22O2MV",
        "image_url": "https://s3.reutersmedia.net/resources/r/?m=02&d=20200512&t=2&i=1518369048&w=1200&r=LYNXMPEG4B1KN",
        "date": "2020-05-12T17:38:29Z",
        "content": "LONDON (Reuters) - At least 20,000 people have died in care homes in England and Wales as a consequence of the coronavirus pandemic, according to Reuters calculations based on official data. \r\nIn the eight weeks to May 1, there were 37,627 people who died in … [+2555 chars]",
        "created_at": "2020-05-13T04:18:37.032Z",
        "updated_at": "2020-05-13T04:18:37.032Z"
    },
    {
        "id": 9,
        "source": "Chicagotribune.com",
        "author": "Chicago Tribune staff",
        "title": "Chicago Tribune staff",
        "description": "Here are the latest updates on the coronavirus in the Chicago area and the rest of Illinois.",
        "url": "https://www.chicagotribune.com/coronavirus/ct-coronavirus-pandemic-chicago-illinois-news-20200512-2fxtlpdazrhcxb3x3542i5wfxy-story.html",
        "image_url": "https://www.chicagotribune.com/resizer/_N4mu-bpdycN3Vtus-C8HcSoHWE=/1200x0/top/cloudfront-us-east-1.images.arcpublishing.com/tronc/ATT3K4CT7JEE7KDD3XI7OYQCEM",
        "date": "2020-05-12T14:25:00Z",
        "content": null,
        "created_at": "2020-05-13T04:18:37.036Z",
        "updated_at": "2020-05-13T04:18:37.036Z"
    },
    {
        "id": 10,
        "source": "Marketwatch.com",
        "author": "Associated Press",
        "title": "Associated Press",
        "description": "Additional 5,300 deaths could have been caused by COVID-19",
        "url": "http://www.marketwatch.com/story/new-york-citys-coronavirus-death-toll-may-be-worse-than-official-numbers-study-finds-2020-05-11",
        "image_url": "https://s.marketwatch.com/public/resources/images/MW-IG299_nyc051_ZG_20200511232210.jpg",
        "date": "2020-05-12T03:23:00Z",
        "content": "NEW YORK New York Citys death toll from the coronavirus may be thousands of fatalities worse than the tally kept by the city and state, according to an analysis released Monday by the U.S. Centers for Disease Control and Prevention.Between March 11 and May 2,… [+1579 chars]",
        "created_at": "2020-05-13T04:18:37.039Z",
        "updated_at": "2020-05-13T04:18:37.039Z"
    }
]

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.articles}>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View>
              <View style={{display:"flex", flexDirection:"row",marginLeft:"3%", marginRight:"2%",}}>
                <View style = {{width:"70%", height:"75%",}}>
                  <View style = {{display:"flex", flexDirection:"row", marginBottom:"2%",}}>
                    <Text>{item.date}</Text>
                    <Text onPress={() => Linking.openURL(item.url)} style = {{fontStyle:"italic", marginLeft:"20%"}}>Source</Text>
                  </View>
                  
                  <Text style = {{fontFamily:"Avenir", fontWeight:"bold", fontSize:"16" }} onPress={() => Linking.openURL(item.url)}>{item.description}</Text>
                </View>

                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 90, height: 90, borderRadius: "10", marginLeft:"3%", }}
                />
              </View>
              <Divider style={{ backgroundColor: 'black',marginTop:"3%", marginBottom:"4%",marginLeft: "3%", marginRight: "4%", height: 1, }} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    display:"flex",
    flexDirection:"row",
  },
  articles: {
    flex: 1,
    marginBottom: 60,
  },
});
