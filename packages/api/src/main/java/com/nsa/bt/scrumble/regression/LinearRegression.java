package com.nsa.bt.scrumble.regression;
import org.springframework.stereotype.Service; 

@Service
public class LinearRegression {
    private double c, m;

    public void trianModel(int[] x, int[] y) {
        if(x.length != y.length) {
            throw new IllegalArgumentException("The parameters for x and y need to be the same size!");
        }
        if(x.length < 10) { // if not enough data given resorts to defualt values
            x = new int[]{1,2,3,5,8};
            y = new int[]{28800,86400,144000,201600,288000};
        }
        int valuesLength = x.length;
        int sumX = 0;
        int sumY = 0;
        int sumXx = 0;
        int sumXy = 0;
        for(int i = 0; i < valuesLength; i++) {
            sumX += x[i];
            sumY += y[i];
            sumXx += x[i]*x[i];
            sumXy += x[i]*y[i];
        }
        double xBar = sumX / valuesLength;
        double yBar = sumY / valuesLength;
        double xXBar = 0.0;
        double yYBar = 0.0;
        double xYBar = 0.0;
        for (int i = 0; i < valuesLength; i++) {
            xXBar += (x[i] - xBar) * (x[i] - xBar);
            yYBar += (y[i] - yBar) * (y[i] - yBar);
            xYBar += (x[i] - xBar) * (y[i] - yBar);
        }
        // calculating coefficient and y intercept for linear equation: y=mx+c
        m  = xYBar / xXBar;
        c = yBar - m * xBar;
    }
    public double predict(int x) {
        return m * x + c; // Finds y value
    }
    public String timeConvertion(double time) {
        double tmp = time;
        String timeString = "";
        if (tmp >= 576000) { // Equivilant to 1 month
            int round =  (int) (tmp/ 576000);
            timeString = timeString + round + "mo";
            tmp = tmp - round * 576000;
        }
        if (tmp >= 144000) { // Equivilant to 1 week
            int round = (int)(tmp/ 144000);
            timeString = timeString + round + "w";
            tmp = tmp - round * 144000;
        }
        if (tmp >= 28800) { // Equivilant to 1 day
            int round = (int)(tmp/ 28800);
            timeString = timeString + round + "d";
            tmp = tmp - round * 28800;
        }
        if (tmp >= 3600) { // Equivilant to 1 hour 
            int round = (int)(tmp/ 3600);
            timeString = timeString + round + "h";
            tmp = tmp - round * 3600;
        }
        return timeString;
    }
}
