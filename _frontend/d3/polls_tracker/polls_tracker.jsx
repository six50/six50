import './polls_tracker.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3'
import map from 'lodash.map';
import sortBy from 'lodash.sortby';

import Graph from './graph';
import PollsList from '../../components/polls_list/polls_list';

const POLLS = [[{"company": "YouGov", "client": "Times", "method": "Online", "from": 1493683200000, "to": 1493769600000, "sample_size": 2066.0, "con": 0.48, "lab": 0.29, "ld": 0.1, "ukip": 0.05, "grn": 0.02, "snp": null, "pdf": "http://d25d2506sfb94s.cloudfront.net/cumulus_uploads/document/dpzz1r8u3o/TimesResults_170503_VI_Trackers_with_Slogans_W.pdf"}, {"company": "Kantar TNS", "client": null, "method": "Online", "from": 1493251200000, "to": 1493683200000, "sample_size": null, "con": 0.48, "lab": 0.24, "ld": 0.11, "ukip": 0.07, "grn": 0.04, "snp": null, "pdf": "http://www.tns-bmrb.co.uk/sites/tns-bmrb/files/KPUK%20Tables%20and%20Method%20Note%203.5.2017.pdf"}, {"company": "Panelbase", "client": null, "method": "Online", "from": 1493337600000, "to": 1493683200000, "sample_size": 1034.0, "con": 0.47, "lab": 0.3, "ld": 0.1, "ukip": 0.05, "grn": 0.02, "snp": 0.05, "pdf": "http://www.panelbase.com/media/polls/W10470w2TablesForPublication020517.pdf"}, {"company": "ICM Online", "client": "Guardian", "method": "Online", "from": 1493337600000, "to": 1493683200000, "sample_size": 1970.0, "con": 0.47, "lab": 0.28, "ld": 0.08, "ukip": 0.08, "grn": 0.04, "snp": 0.03, "pdf": "https://www.icmunlimited.com/wp-content/uploads/2017/05/2017_guardian_campaignpoll4_april28-02may.pdf"}, {"company": "ICM Online", "client": "Sun", "method": "Online", "from": 1493251200000, "to": 1493337600000, "sample_size": 2012.0, "con": 0.47, "lab": 0.28, "ld": 0.09, "ukip": 0.08, "grn": 0.04, "snp": 0.04, "pdf": "https://www.icmunlimited.com/wp-content/uploads/2017/05/2017_sunonsunday_camp_apr28th.pdf"}, {"company": "YouGov Online", "client": "Times", "method": "Online", "from": 1493251200000, "to": 1493337600000, "sample_size": 1612.0, "con": 0.44, "lab": 0.31, "ld": 0.11, "ukip": 0.06, "grn": 0.02, "snp": 0.04, "pdf": "http://d25d2506sfb94s.cloudfront.net/cumulus_uploads/document/zebfsayat4/SundayTimesResults_170428_W.pdf"}, {"company": "Opinium Online", "client": "Observer", "method": "Online", "from": 1493078400000, "to": 1493337600000, "sample_size": 2007.0, "con": 0.47, "lab": 0.3, "ld": 0.08, "ukip": 0.07, "grn": 0.03, "snp": 0.05, "pdf": "http://opinium.co.uk/wp-content/uploads/2017/04/VI-25-04-2017-Tables.xls"}, {"company": "ORB Online", "client": "Telegraph", "method": "Online", "from": 1493164800000, "to": 1493251200000, "sample_size": 2093.0, "con": 0.42, "lab": 0.31, "ld": 0.1, "ukip": 0.08, "grn": 0.04, "snp": 0.04, "pdf": "https://www.orb-international.com/perch/resources/orb-results-26th-27th-april-sunday.pdf"}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1493164800000, "sample_size": 1590.0, "con": 0.45, "lab": 0.29, "ld": 0.1, "ukip": 0.07, "grn": 0.03, "snp": 0.05, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": null, "to": 1493078400000, "sample_size": 1004.0, "con": 0.49, "lab": 0.26, "ld": 0.13, "ukip": 0.04, "grn": 0.01, "snp": 0.04, "pdf": null}, {"company": "Panelbase Online", "client": null, "method": null, "from": null, "to": 1492992000000, "sample_size": 1026.0, "con": 0.49, "lab": 0.27, "ld": 0.1, "ukip": 0.05, "grn": 0.03, "snp": 0.05, "pdf": null}, {"company": "Kantar TNS Online", "client": null, "method": null, "from": null, "to": 1492992000000, "sample_size": 1196.0, "con": 0.46, "lab": 0.24, "ld": 0.11, "ukip": 0.08, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1492992000000, "sample_size": 2024.0, "con": 0.48, "lab": 0.27, "ld": 0.1, "ukip": 0.07, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "Norstat", "client": null, "method": null, "from": 1492646400000, "to": 1492905600000, "sample_size": 1036.0, "con": 0.42, "lab": 0.26, "ld": 0.1, "ukip": 0.08, "grn": 0.06, "snp": null, "pdf": null}, {"company": "Survation Online", "client": "Mail on Sunday", "method": null, "from": null, "to": 1492819200000, "sample_size": 2072.0, "con": 0.4, "lab": 0.29, "ld": 0.11, "ukip": 0.11, "grn": 0.02, "snp": 0.04, "pdf": null}, {"company": "ICM Online", "client": "Peston on Sunday", "method": null, "from": null, "to": 1492732800000, "sample_size": 2027.0, "con": 0.48, "lab": 0.26, "ld": 0.1, "ukip": 0.08, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1492732800000, "sample_size": 1590.0, "con": 0.48, "lab": 0.25, "ld": 0.12, "ukip": 0.05, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ORB Online", "client": "Telegraph", "method": null, "from": null, "to": 1492646400000, "sample_size": 1860.0, "con": 0.44, "lab": 0.29, "ld": 0.08, "ukip": 0.1, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": null, "to": 1492646400000, "sample_size": 2003.0, "con": 0.45, "lab": 0.26, "ld": 0.11, "ukip": 0.09, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "ComRes Online", "client": "Sun Mirror", "method": null, "from": null, "to": 1492646400000, "sample_size": 2074.0, "con": 0.5, "lab": 0.25, "ld": 0.11, "ukip": 0.07, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1492560000000, "sample_size": null, "con": 0.48, "lab": 0.24, "ld": 0.12, "ukip": 0.07, "grn": 0.02, "snp": null, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1492473600000, "sample_size": 1000.0, "con": 0.46, "lab": 0.25, "ld": 0.11, "ukip": 0.08, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "ICM Online", "client": null, "method": null, "from": 1492128000000, "to": 1492387200000, "sample_size": 2052.0, "con": 0.44, "lab": 0.26, "ld": 0.12, "ukip": 0.11, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1492300800000, "sample_size": 2069.0, "con": 0.44, "lab": 0.23, "ld": 0.12, "ukip": 0.1, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": null, "to": 1492041600000, "sample_size": 2002.0, "con": 0.38, "lab": 0.29, "ld": 0.07, "ukip": 0.14, "grn": 0.05, "snp": 0.05, "pdf": null}, {"company": "ComRes Online", "client": "Ind on Sun/Sun Mirror", "method": null, "from": null, "to": 1492041600000, "sample_size": 2026.0, "con": 0.46, "lab": 0.25, "ld": 0.11, "ukip": 0.09, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1491436800000, "sample_size": 1651.0, "con": 0.42, "lab": 0.25, "ld": 0.11, "ukip": 0.11, "grn": 0.03, "snp": 0.08, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1491091200000, "sample_size": 2005.0, "con": 0.43, "lab": 0.25, "ld": 0.11, "ukip": 0.11, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1490572800000, "sample_size": 1957.0, "con": 0.43, "lab": 0.25, "ld": 0.11, "ukip": 0.1, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1490054400000, "sample_size": 1627.0, "con": 0.41, "lab": 0.25, "ld": 0.11, "ukip": 0.12, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1489881600000, "sample_size": 2012.0, "con": 0.45, "lab": 0.26, "ld": 0.09, "ukip": 0.1, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": null, "to": 1489708800000, "sample_size": 2007.0, "con": 0.41, "lab": 0.28, "ld": 0.08, "ukip": 0.13, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ComRes Online", "client": "Ind on Sun/Sun Mirror", "method": null, "from": null, "to": 1489708800000, "sample_size": 2026.0, "con": 0.42, "lab": 0.25, "ld": 0.12, "ukip": 0.1, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "GfK Online", "client": null, "method": null, "from": null, "to": 1489536000000, "sample_size": 1938.0, "con": 0.41, "lab": 0.28, "ld": 0.07, "ukip": 0.12, "grn": 0.06, "snp": 0.05, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": null, "to": 1489449600000, "sample_size": 1032.0, "con": 0.43, "lab": 0.3, "ld": 0.13, "ukip": 0.06, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1489449600000, "sample_size": 1631.0, "con": 0.44, "lab": 0.27, "ld": 0.1, "ukip": 0.09, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1489017600000, "sample_size": 1598.0, "con": 0.44, "lab": 0.25, "ld": 0.1, "ukip": 0.11, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1488672000000, "sample_size": 1787.0, "con": 0.44, "lab": 0.28, "ld": 0.08, "ukip": 0.11, "grn": 0.05, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1488240000000, "sample_size": 1666.0, "con": 0.42, "lab": 0.25, "ld": 0.11, "ukip": 0.12, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1487721600000, "sample_size": 2060.0, "con": 0.41, "lab": 0.25, "ld": 0.11, "ukip": 0.13, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1487462400000, "sample_size": 2028.0, "con": 0.44, "lab": 0.26, "ld": 0.08, "ukip": 0.13, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": null, "to": 1487203200000, "sample_size": 2004.0, "con": 0.4, "lab": 0.27, "ld": 0.08, "ukip": 0.14, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": null, "to": 1487030400000, "sample_size": 1014.0, "con": 0.4, "lab": 0.29, "ld": 0.13, "ukip": 0.09, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1486944000000, "sample_size": 2052.0, "con": 0.4, "lab": 0.24, "ld": 0.11, "ukip": 0.15, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "ComRes Online", "client": "Ind on Sun/Sun Mirror", "method": null, "from": null, "to": 1486684800000, "sample_size": 1218.0, "con": 0.41, "lab": 0.26, "ld": 0.11, "ukip": 0.11, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1486339200000, "sample_size": 1984.0, "con": 0.4, "lab": 0.24, "ld": 0.11, "ukip": 0.14, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1486252800000, "sample_size": 1984.0, "con": 0.42, "lab": 0.27, "ld": 0.1, "ukip": 0.12, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": null, "to": 1486080000000, "sample_size": 2005.0, "con": 0.37, "lab": 0.3, "ld": 0.08, "ukip": 0.14, "grn": 0.05, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1485820800000, "sample_size": 1705.0, "con": 0.4, "lab": 0.26, "ld": 0.11, "ukip": 0.12, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1485216000000, "sample_size": 1643.0, "con": 0.4, "lab": 0.24, "ld": 0.1, "ukip": 0.14, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1485043200000, "sample_size": 2052.0, "con": 0.42, "lab": 0.26, "ld": 0.1, "ukip": 0.13, "grn": 0.05, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1484697600000, "sample_size": 1654.0, "con": 0.42, "lab": 0.25, "ld": 0.11, "ukip": 0.12, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": null, "to": 1484524800000, "sample_size": 1132.0, "con": 0.43, "lab": 0.31, "ld": 0.11, "ukip": 0.06, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "Survation Online", "client": "Mail on Sunday", "method": null, "from": null, "to": 1484265600000, "sample_size": 1177.0, "con": 0.38, "lab": 0.29, "ld": 0.1, "ukip": 0.13, "grn": 0.02, "snp": 0.04, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": null, "to": 1484179200000, "sample_size": 2007.0, "con": 0.38, "lab": 0.3, "ld": 0.07, "ukip": 0.14, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1484006400000, "sample_size": 1660.0, "con": 0.39, "lab": 0.28, "ld": 0.11, "ukip": 0.13, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": null, "to": 1483833600000, "sample_size": 2000.0, "con": 0.42, "lab": 0.28, "ld": 0.09, "ukip": 0.12, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1483488000000, "sample_size": 1740.0, "con": 0.39, "lab": 0.26, "ld": 0.1, "ukip": 0.14, "grn": 0.04, "snp": 0.06, "pdf": null}], [{"date": 1483488000000, "con": 0.3958177925, "lab": 0.2607957267, "ld": 0.0977858418, "ukip": 0.1353068449, "grn": 0.0408725024}, {"date": 1483833600000, "con": 0.3933340868, "lab": 0.2768501778, "ld": 0.0991915853, "ukip": 0.1314133796, "grn": 0.0367548132}, {"date": 1484006400000, "con": 0.3961791339, "lab": 0.285046539, "ld": 0.0994336299, "ukip": 0.1283546045, "grn": 0.0347917755}, {"date": 1484179200000, "con": 0.3893430834, "lab": 0.2916979236, "ld": 0.1031203452, "ukip": 0.1333925531, "grn": 0.0330156601}, {"date": 1484265600000, "con": 0.3917450892, "lab": 0.2956609258, "ld": 0.1045128565, "ukip": 0.1338462709, "grn": 0.0332047388}, {"date": 1484524800000, "con": 0.4126162894, "lab": 0.2716291841, "ld": 0.1075714646, "ukip": 0.1249035062, "grn": 0.0333667435}, {"date": 1484697600000, "con": 0.4219587295, "lab": 0.2646088133, "ld": 0.1078229688, "ukip": 0.1221959586, "grn": 0.0365675179}, {"date": 1485043200000, "con": 0.4116846062, "lab": 0.251070103, "ld": 0.1019619219, "ukip": 0.1320239168, "grn": 0.0359326414}, {"date": 1485216000000, "con": 0.4086164253, "lab": 0.2517379689, "ld": 0.1027812822, "ukip": 0.1311097942, "grn": 0.0368388478}, {"date": 1485820800000, "con": 0.3984371726, "lab": 0.2596456487, "ld": 0.1063458283, "ukip": 0.1281079973, "grn": 0.0407149013}, {"date": 1486080000000, "con": 0.4006420881, "lab": 0.2620403027, "ld": 0.1066724607, "ukip": 0.1282306595, "grn": 0.0424599475}, {"date": 1486252800000, "con": 0.4029023257, "lab": 0.2613693061, "ld": 0.1059949631, "ukip": 0.1285093419, "grn": 0.0421403788}, {"date": 1486339200000, "con": 0.404268884, "lab": 0.2614024736, "ld": 0.1053382059, "ukip": 0.1273383899, "grn": 0.0417099533}, {"date": 1486684800000, "con": 0.4051063069, "lab": 0.256363959, "ld": 0.1096336181, "ukip": 0.1255622558, "grn": 0.04}, {"date": 1486944000000, "con": 0.4028184065, "lab": 0.2634451634, "ld": 0.1006032471, "ukip": 0.130911342, "grn": 0.04}, {"date": 1487030400000, "con": 0.4039087238, "lab": 0.2638154389, "ld": 0.0963151034, "ukip": 0.1322462757, "grn": 0.04}, {"date": 1487203200000, "con": 0.4095043776, "lab": 0.2661618996, "ld": 0.0873391803, "ukip": 0.1394911631, "grn": 0.04}, {"date": 1487462400000, "con": 0.4114444491, "lab": 0.2594258787, "ld": 0.0948482714, "ukip": 0.1333795358, "grn": 0.0362300161}, {"date": 1487721600000, "con": 0.4157855082, "lab": 0.2543332319, "ld": 0.1002477958, "ukip": 0.1285699135, "grn": 0.0359848206}, {"date": 1488240000000, "con": 0.4246385693, "lab": 0.2586368666, "ld": 0.103550436, "ukip": 0.119537801, "grn": 0.0398994655}, {"date": 1488672000000, "con": 0.4337456584, "lab": 0.2622564106, "ld": 0.1012900849, "ukip": 0.1126475924, "grn": 0.040808485}, {"date": 1489017600000, "con": 0.4363980705, "lab": 0.2704596664, "ld": 0.0983437886, "ukip": 0.1096013563, "grn": 0.0410557849}, {"date": 1489449600000, "con": 0.4253126106, "lab": 0.2757318476, "ld": 0.1060958534, "ukip": 0.1109411705, "grn": 0.0406574601}, {"date": 1489536000000, "con": 0.4223097866, "lab": 0.2790784414, "ld": 0.11, "ukip": 0.111425318, "grn": 0.0425587716}, {"date": 1489708800000, "con": 0.4197638506, "lab": 0.2688633785, "ld": 0.1041412505, "ukip": 0.111205694, "grn": 0.0395320342}, {"date": 1489881600000, "con": 0.4168314415, "lab": 0.2590112759, "ld": 0.102375692, "ukip": 0.1127048325, "grn": 0.0357590773}, {"date": 1490054400000, "con": 0.4169421477, "lab": 0.2524585151, "ld": 0.105168938, "ukip": 0.1128409505, "grn": 0.0326062671}, {"date": 1490572800000, "con": 0.4257892414, "lab": 0.2504661662, "ld": 0.1092821359, "ukip": 0.1068368803, "grn": 0.0330425733}, {"date": 1491091200000, "con": 0.4259738578, "lab": 0.2509569376, "ld": 0.1090291148, "ukip": 0.1077549453, "grn": 0.0342171125}, {"date": 1491436800000, "con": 0.4237398717, "lab": 0.253916393, "ld": 0.1060446671, "ukip": 0.1108584548, "grn": 0.0367634473}, {"date": 1492041600000, "con": 0.4192147292, "lab": 0.2664426531, "ld": 0.092603065, "ukip": 0.1158162624, "grn": 0.04499761}, {"date": 1492300800000, "con": 0.438966149, "lab": 0.2493242939, "ld": 0.1137661945, "ukip": 0.1023458792, "grn": 0.0407794239}, {"date": 1492387200000, "con": 0.4475782773, "lab": 0.2452748861, "ld": 0.1177857089, "ukip": 0.0956051737, "grn": 0.0386049185}, {"date": 1492473600000, "con": 0.458030144, "lab": 0.2499501559, "ld": 0.1150785997, "ukip": 0.0872668679, "grn": 0.0351596325}, {"date": 1492560000000, "con": 0.4660823886, "lab": 0.2530103345, "ld": 0.1114319471, "ukip": 0.080223981, "grn": 0.03282633}, {"date": 1492646400000, "con": 0.4721227198, "lab": 0.2568794562, "ld": 0.1099834688, "ukip": 0.0768579853, "grn": 0.0294589828}, {"date": 1492732800000, "con": 0.4660765968, "lab": 0.2634378845, "ld": 0.1077818717, "ukip": 0.0796094428, "grn": 0.0269400662}, {"date": 1492819200000, "con": 0.4646376691, "lab": 0.2645072302, "ld": 0.1059918679, "ukip": 0.0780985925, "grn": 0.027042983}, {"date": 1492905600000, "con": 0.4668892763, "lab": 0.2644063158, "ld": 0.1042786522, "ukip": 0.0754764193, "grn": 0.0272929243}, {"date": 1492992000000, "con": 0.4637737986, "lab": 0.2647645126, "ld": 0.1022329549, "ukip": 0.0694259885, "grn": 0.0277835812}, {"date": 1493078400000, "con": 0.4640332811, "lab": 0.2730185825, "ld": 0.1012469023, "ukip": 0.0672461, "grn": 0.0304170496}, {"date": 1493164800000, "con": 0.457937774, "lab": 0.2850853652, "ld": 0.1002500997, "ukip": 0.067962303, "grn": 0.0313854361}, {"date": 1493251200000, "con": 0.454501035, "lab": 0.2957752362, "ld": 0.0976658022, "ukip": 0.071675355, "grn": 0.0325035063}, {"date": 1493337600000, "con": 0.4545679626, "lab": 0.3040447938, "ld": 0.0943155812, "ukip": 0.0744925305, "grn": 0.0334602302}, {"date": 1493683200000, "con": 0.4745611517, "lab": 0.2843260973, "ld": 0.0980469442, "ukip": 0.0593037407, "grn": 0.0267286108}, {"date": 1493769600000, "con": 0.479274864, "lab": 0.2814449449, "ld": 0.0986277874, "ukip": 0.0557614555, "grn": 0.0249442419}]];
const PARTIES = ['con', 'lab', 'ld', 'grn', 'ukip', 'snp'];

const _dateParse = d3.timeParse('%d %b %Y');

function dateParse(x) {
  if (!x) {
    return null;
  }

  if (typeof(x) === 'number') {
    return new Date(x);
  }

  return _dateParse(x.replace(/\-/g, ' '));
}

export default class PollsTracker {
  constructor(elem) {
    this.colours = JSON.parse(elem.dataset.colours);
    this.names = JSON.parse(elem.dataset.names);
    this.elem = elem;

    // Parse/clean data
    this.polls = [[], []];

    this.polls[0] = sortBy(map(POLLS[0], x => ({
      ...x,
      from: dateParse(x.from),
      to: dateParse(x.to)
    })), x => x.to);

    this.polls[1] = sortBy(map(POLLS[1], x => ({
      ...x,
      date: dateParse(x.date),
    })), x => x.date);

    this.render();
  }

  render() {
    const graphElem = this.elem.querySelector('.graph');
    if (graphElem) {
      this.graph = new Graph(graphElem, this.colours, this.names, PARTIES, this.polls);
    }

    const tableElem = this.elem.querySelector('.table');
    if (tableElem) {
      this.table = ReactDOM.render(
        <PollsList
          names={this.names}
          colours={this.colours}
          polls={this.polls}
        />,
        tableElem
      );
    }
  }
}
