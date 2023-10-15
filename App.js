import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Info from "./components/Info";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import api from "./network/api";

const CODE_IMAGES = {
  200: require("./images/storm.png"),
  500: require("./images/light_rain.png"),
  501: require("./images/raining.png"),
  800: require("./images/sunny.png"),
  801: require("./images/cloudness.png"),
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      setLocation(location);
      const data = await api.getInfo({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
      setData(data);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.hero}>
        <Text style={styles.nameCity}>{data.name}</Text>
      </View>
      <View style={styles.body}>
        <Image
          source={CODE_IMAGES[data.weather[0].id]}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text style={styles.temperature}>{data.main.temp.toFixed()} ºC</Text>
        <Text style={styles.gretting}>{data.weather[0].description}</Text>
      </View>
      <View style={styles.footer}>
        <Info
          icon={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVR4nO2Zyy4EQRSGP2ISEYmNEY+AeAQ2LhsWEo8gjMtglrYub8AjiAfBQkTCsMCGFZHYWGGn5SSnk9LpQV9mumpSX1JJZ6pOnfP3OVXVmYLms6HNaWrAFxAAWzjKsiEi0OdNHGNDA48K+XKpzCpG0DVDyIpLYpaMYMMyCoWY5SZtHYdERIVEM7Zus4hqpC8qBB0Tjhdba3jWoNZi+uKEoGPF5gmLGAcmG/Q1EoLaiK0TBL8IcYrAC7EMnxHb8BmxDZ8R22ibjJwCJ0UH4fF4PB5nOQYuaAOCdjnZAy/EMqzLSB9QaqGQLqCHnOkF3oA6UG6BkDJwCbwC3eSIZOJKA7pJKCbpZ3xZfQQqRjKTK6aDO2Awbwf89HHbJB9NF9MyEXEO6znVcLfOFaQo3UyU1fFHjNNO/Zd9X9fHiy5aeT4AJnSMyQDwmXIzyeUt9kd+mwaujZ2qUZOApyK2MleuO1QaOoAd4xZXdrhVYEjPAmnDerkTlpCM3VZba9jT4N6BhT+Ck75FLUux2cUSZg0RYwnsxg0xMxRMCXjUYOQtJ6Witg/NOPiSMG+siTS13mGsmTkK5EiDiLvN/S9VneOQArnXIEYyzDFqnOaZCFPrcjsTIfKFWXQgWdv5N5QbD3SxLfr5AAAAAElFTkSuQmCC"
          }
          title={"Sunrise"}
          value={new Date(data.sys.sunrise).toLocaleTimeString()}
        />
        <Info
          icon={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACX0lEQVR4nO2az0tUURTHPylohWaFZoWmBoHRRsSVLbI2LqtF0j9gLpL6A4o2Ef0BbUIIahW4SC0koaJCGLHaVIsWWQr9sESDFJ02MXHhO3ARnPeezX3cW+8DZzEzh3fed+495553ZiAjI6OcVAKngPvAR+AX8FWvzwIVBEALMAUUSthLoBWPaQLmdbOzwHmgDagGmoF+4IM+/+azmJxu8hFQt4FPDfBQfi983WavZRuJKFKr3DFi+hLG6AXuADNAHlgB3gFDwAnKmORxv+FzEjIS0/+wteKFEvYEOESKHFBgU82iOA4sy38BuAp0Abu0VTuAS8o747MIHCUlqhTUlOaolfgp3wcR23YHMCzfJRUa57Qp4KcIv0n5jcbcthWWmKekwMWYOTKjUr47wbVrge+6fg8OabD2s+kASrEd2LaJGJd1/Zs4Yr9O9mKF2eIoTqdimNJcNrYCR4ArwA8FeA/swR11imPiRSbgZs00j/W4pUaxVsspJK+kvQUcIx26FPstgXNNQkzrEix7rVzsJlCqVQ2LuRgkzcBzifis56NgaFBTeQNYs9oeU+4j+dvy68p+A3eTlHafhCwAr4DrcVchIyPjP2TSUQXKa0x0W2dDsEIK62xcB16QfVK7HlMXJca0/40EzD6NVI2YZw4fiVOh3hqKnyZwLlhzraBptTraoKmKOVr1niTD7tRJ8vPDgITcw0PeyHbGmOHOSsgZPCSnm3tcQowRMSG/aV9/omuyzoc5YBA4qJO9RdupuBLzes/rJM5F9FrTvouwk/4kMGb9seCLDr8+X7dTRsa/zB9yijuqprAMOQAAAABJRU5ErkJggg==`}
          title={"Winds"}
          value={data.wind.speed}
        />
        <Info
          icon={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACGklEQVR4nO2aTUtUURjHf5uwQEywxeQLSYrM3vIjJNhEGwnKRW4zwXxpWd8hSChF3IVotVKXEfUNXAQui6CFLcoWvnvlgf/ARWgaZs6cc7pzf/DAcO9z/uecO89znnvvudAYhoBlYAv4JdvSsZv8JzwHToHkL2bnnhE5dzXYI+AlMAi0y24A8zpnPneImI8a5KMKPhPy+UDE/NYg2yr4XJaP5U20JDJXfsHIJxIbSdZCK6nBPpORiXwiIjIXWk03kST2HPkXeY74oqlypCUrOXIhzxGP5DlCniONoalCKzMTacnriCc6aggtaxMVw8APDe5rFf7f5GttbhEJ46nXoO+AniramM/71OvVhwSmBBzrxfSTGtpPq61NZoRAXAV+6qpO1aEzLY0doEAAljSAtw60ymG2iGd6FA57wDUHer3APnAIdOKRp7qCbxxqrkhzBo9sqtNRh5r3pLmOR76rUwsJV1yXptUYb+yp04sONS9J07S9satOWx1q2i5Xol0vb2yr0wGHmkVpfiFAst93qDkWItkfq1NbMl2xWsWOsHO6VRAPtNrUS7+0joAuPLPQgFuUVwSgM7V6zdahM5fady8QCPsM40S38rM1TuJYGrcJzKQGUn6w6qsyJ8rhdKLFIwpKqc83DrQCPVBtaJUVtcSu6S63HE7B/4nzXAFepB57K5n5vNbDWbR0qRZsqEr/kdlvK3Z2zvkSewb8lSIbNllRawAAAABJRU5ErkJggg=="
          }
          title={"Temperature"}
          value={`${data.main.temp_max} ºC`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  temperature: {
    fontSize: 60,
  },
  gretting: {
    fontSize: 23,
    color: "#444",
  },
  body: {
    flex: 2,
    alignItems: "center",
    // backgroundColor: "red",
  },
  footer: {
    // backgroundColor: "orange",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  hero: {
    // backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  nameCity: {
    fontSize: 42,
  },
  time: {
    fontSize: 22,
    color: "#444",
  },
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
});
