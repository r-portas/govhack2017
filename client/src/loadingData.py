import csv
import json
import requests
import datetime

class DataType(object):
    def __init__(self):
        self._total_info = []
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
            list_line = [(float(line[8]), float(line[9])),
                         self.convertAtmosWeather(line[31]),
                         self.convertLight(line[32])]

            #storing to total
            self._total_info.append(list_line)

            #Store to severity
            self._total_severity.append(self.convertSeverity(line[1]))

            self._total_speed.append(self.convertSpeed(line[29]))
            
        file.close()

class InputCrashLocation(DataType):
    def __init__(self):
        self._total_info =[]

        self.addData(-27.47, 153.03)


    def addData(self, lat, lon):
        response = requests.get("http://api.openweathermap.org/data/2.5/weather?lat="+str(lat)+"&lon="+str(lon)+"&appid=8617122af42ff01a0f0a2bab082b3e2f")
        data = response.json()

        inputData = [lat,
                     lon,
                     self.convertAtmosWeather(data['weather'][0]['main']),#clear/raining
                     self.convertTimeToDawnDusk(data['sys']['sunrise'],data['sys']['sunset'])]

        self._total_info.append(inputData)

    def convertTimeToDawnDusk(self,unixTimeSunrise, unixTimeSunset):
        """ determine the level of light from time""
        sunrise = datetime.datetime.fromtimestamp(unixTimeSunrise)
        sunset = datetime.datetime.fromtimestamp(unixTimeSunset)
        current = datetime.datetime.now()

        if abs(sunrise.hour - current.hour) <= 1 or abs(sunset.hour - current.hour) <= 1:
            return 1
        elif current.time() >= sunset.time() or current.time() <= sunrise.time():
            return 2
        return 0      

def main():
    #x = CrashLocations()
    x = InputCrashLocation()
    
if __name__ == "__main__":
    main()
