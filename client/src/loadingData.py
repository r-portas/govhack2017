import csv
import json
import requests
import numpy as np
from sklearn import tree
import datetime

class DataType(object):
    def __init__(self):
        self._total_info = []
        self._weather_info = []
        self._total_severity =[]
        self._total_speed = []

        self.process_file()

        self.writecsv("forSophiaLocations.csv")

    def process_file(self):
        pass

    def writecsv(self, name):
        file = open(name, "w")
        file.write(str(self._total_info))
        file.close()

    def getIncidentInfo(self):
        return self._total_info
    
    def getIncidentWeatherInfo(self):
        return self._weather_info

    def getIncidentSeverity(self):
        return self._total_severity       

    def getSpeed(self):
        return self._total_speed

    def convertRoadWeather(self, condition):
        """
        convert wet/dry string to integer
        
        param: road weather condition        
        return:
            0 if Dry
            1 if Wet

        precondition:
        * must be "Dry" or "Wet"
        """
        if condition == "Dry":
            return 0
        
        return 1

    def convertAtmosWeather(self, condition):
        """
        convert clear/rain string to integer
        
        param: atmos weather condition        
        return:
            0 if Clear
            1 if Raining

        precondition:
        * must be "Clear" or "Raining"

        """
        if condition == "Clear":
            return 0
        
        return 1

    def convertLight(self, condition):
        """
        convert clear/rain string to integer
        
        param: atmos weather condition        
        return:
            0 if Daylight
            1 if Dawn/Dusk
            2 if Darkness - Lighted
            3 if Darkness - Unlighted

        precondition:
        * must be "Daylight", "Dawn/Dusk" or "Darkness - Lighted" or "Darkness - Unlighted"
        """
        if condition == "Daylight":
            return 0

        elif condition == "Dawn/Dusk":
            return 1

        elif condition == "Darkness - Lighted":
            return 2
        
        return 3

    def convertSeverity(self, condition):
        """
        convert severity string to integer
        
        param: severity condition        
        return:
            Property damage only[0]
            Minor injury[1]
            Medical treatment[2]
            Hospitalisation[3]
            Fatal[4]
            
        precondition:
        * must be "Clear" or "Raining"
        """
        if condition == "Property damage only":
            return 0

        elif condition == "Minor injury":
            return 1

        elif condition == "Medical treatment":
            return 2

        elif condition == "Hospitalisation":
            return 3

        return 4

    def convertSpeed(self, speed):
        speed = speed.split(' ')
        return int(speed[-2])

class CrashLocations(DataType):
    def __init__(self):
        super().__init__()
        
    def process_file(self):
        """converts csv file to a list of lists.
        Each line is a single crash incident.

        Format of: severity(Property damage only[0]/Minor injury[1]/Medical treatment[2]/Hospitalisation[3]/Fatal[4]),
        Format of each element of inputs:
            [position(float, float)
            atmosphereWeather(Clear[0]/Raining[1]),
            light(Daylight[0]/DawnDusk[1]/Darkness - Lighted [2]/Darkness - Not lighted[3])]
        
        params: N/A
        returns: N/A
        """
        file = open("rawlocations.csv", 'r')
        start = True
        for line in file:
            #to skip first line
            if start == True:
                start = False
                continue
            
            line = line.strip().split(',')

            if int(line[2]) <= 2015 or line[13] != "Brisbane City":
                #Filter before 2016 and non-brisbane
                continue
            if line[11] == "":
                line[11] = None

            #Storing data for line
            list_line = [float(line[8]),
                         float(line[9]),
                         self.convertAtmosWeather(line[31]),
                         self.convertLight(line[32])]
            weather_line = [self.convertAtmosWeather(line[31]),
                            self.convertLight(line[32])]

            #storing to total
            self._total_info.append(list_line)
            
            #storing to weather
            self._weather_info.append(weather_line)

            #Store to severity
            self._total_severity.append(self.convertSeverity(line[1]))

            self._total_speed.append(self.convertSpeed(line[29]))
            
        file.close()

class InputCrashLocation(DataType):
    def __init__(self):
        self._total_info = [0]
        self._weather_info = [0]

    def getWeatherInfo(self):
        return self._weather_info
    
    def getTotalInfo(self):
        return self._total_info

    def addData(self, lon, lat):
        response = requests.get("http://api.openweathermap.org/data/2.5/weather?lat="+str(lat)+"&lon="+str(lon)+"&appid=8617122af42ff01a0f0a2bab082b3e2f")
        data = response.json()

        inputData = [lon,
                     lat,
                     self.convertAtmosWeather(data['weather'][0]['main']),#clear/raining
                     self.convertTimeToDawnDusk(data['sys']['sunrise'],data['sys']['sunset'])]

        weatherData = [self.convertAtmosWeather(data['weather'][0]['main']),#clear/raining
                       self.convertTimeToDawnDusk(data['sys']['sunrise'],data['sys']['sunset'])]

        self._total_info[0] = inputData
        self._weather_info[0] = weatherData

        # print(data)  

    def convertTimeToDawnDusk(self,unixTimeSunrise, unixTimeSunset):
        """ determine the level of light from time"""
        sunrise = datetime.datetime.fromtimestamp(unixTimeSunrise)
        sunset = datetime.datetime.fromtimestamp(unixTimeSunset)
        current = datetime.datetime.now()

        if abs(sunrise.hour - current.hour) <= 1 or abs(sunset.hour - current.hour) <= 1:
            return 1
        elif current.time() >= sunset.time() or current.time() <= sunrise.time():
            return 2
        return 0 
    
class MachineLearning(object):
    def __init__(self):
        self._predicted_classes = []
        self._class_names = ['low', 'medium', 'high', 'very high']
        self._feature_names_full = ['longitude', 'latitude', 'atmosphere weather', 'light']
        self._feature_names_weather = ['atmosphere weather', 'light']
        self._atmos_levels = ['clear', 'raining']
        self._light_levels = ['daylight', 'dawndusk', 'darkness - lighted', 'darkness- unlighted']
        self._clf = None
        
    def initTreeFull(self):
        """VERSION WITH LONG/LAT AND WEATHER CONDITIONS"""
        # initialise variables for input into ML
        loc = CrashLocations()
        locData = loc.getIncidentInfo()
        locTargets = loc.getIncidentSeverity()
        
        # convert lists into numerical arrays
        locDataArray = np.asarray(locData)
        locTargetArray = np.asarray(locTargets)
        
        # create decision tree
        self._clf = tree.DecisionTreeClassifier() # max_depth
        self._clf = self._clf.fit(locDataArray, locTargetArray)
        
        # export decision tree
        tree.export_graphviz(self._clf, out_file='tree.dot',
                                    feature_names=self._feature_names_full,
                                    class_names=self._class_names,
                                    filled=True, rounded=True,
                                    special_characters=True)
        
    def initTreeWeather(self):
        """VERSION WITH WEATHER CONDITIONS ONLY"""
        # initialise variables for input into ML
        loc = CrashLocations()
        locData = loc.getIncidentWeatherInfo()
        locTargets = loc.getIncidentSeverity()
        
        # convert lists into numerical arrays
        locDataArray = np.asarray(locData)
        locTargetArray = np.asarray(locTargets)
        
        # create decision tree
        self._clf = tree.DecisionTreeClassifier() # max_depth
        self._clf = self._clf.fit(locDataArray, locTargetArray)
        
        """ FOR DEBUGGING
        # export decision tree
        tree.export_graphviz(self._clf, out_file='tree.dot',
                                    feature_names=self._feature_names_weather,
                                    class_names=self._class_names,
                                    filled=True, rounded=True,
                                    special_characters=True)   
        """
        
    def predictDanger(self, predictInput):
        return self._clf.predict(predictInput)
        
def main():
      ml = MachineLearning()
      inputData = InputCrashLocation()
      lat = -27.464934
      lon = 153.029545
      
      ml.initTreeWeather()
      inputData.addData(lon, lat)
      predictInput = inputData.getWeatherInfo()
      print(inputData.getTotalInfo())
      print(predictInput)
      print(predictInput[3])
      print("Atmosphere weather: " + ml._atmos_levels[predictInput[2]])
      print("Lighting: " + ml._light_levels[predictInput[3]])
      predictOutput = ml.predictDanger(predictInput)
      print(predictOutput)
      
    
if __name__ == "__main__":
    main()
