import csv
import json

class DataType(object):
    def __init__(self):
        self._total_info = []
        self._total_severity =[]

        self.process_file()

    def process_file(self):
        pass

    def writejson(self, name):
        file = open(name, "w")
        file.write(str(self._total_info))
        file.close()

    def getIncidentInfo(self):
        return self._total_info

    def getIncidentSeverity(self):
        return self._total_severity        

class CrashLocations(DataType):
    def __init__(self):
        super().__init__()
        
    def process_file(self):
        """converts csv file to a list of lists.
        Each line is a single crash incident.

        Format of: severity(Property damage only[0]/Minor injury[1]/Medical treatment[2]/Hospitalisation[3]/Fatal[4]),
        Format of each element of inputs:
            [position(float, float)
            speedLimit(int),
            roadWeather(Dry[0]/Wet[1]),
            atmosphereWeather(Clear[0]/Raining[1]),
            light(Daylight[0]/DawnDusk[1]/Darkness - Lighted [2]/Darkness - Not lighted[3])]
        
        params: N/A
        returns: N/A
        """
        
        file = open("locations.csv", 'r')
        start = True
        for line in file:
            #to skip first line
            if start == True:
                start = False
                continue
            
            line = line.strip().split(',')

            if int(line[2]) <= 2015 or line[13] != "Brisbane City":
                #Filter before 2015 and non-brisbane
                continue
            if line[11] == "":
                line[11] = None

            #weather condition (dry - 0/wet - 1)
            line[30] = line[30].split(' - ')
            line[30] = self.convertRoadWeather(line[30][1])

            #Storing data for line
            list_line = [(float(line[8]), float(line[9])),
                         self.convertSpeed(line[29]),
                         line[30],
                         self.convertAtmosWeather(line[31]),
                         self.convertLight(line[32])]

            #storing to total
            self._total_info.append(list_line)

            #Store to severity
            self._total_severity.append(self.convertSeverity(line[1]))

        file.close()

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
            0 if Clear
            1 if Raining

        precondition:
        * must be "Clear" or "Raining"

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
                
def main():
    x = CrashLocations()

if __name__ == "__main__":
    main()
