import './polls_tracker.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3'
import map from 'lodash.map';
import sortBy from 'lodash.sortby';

import Graph from './graph';
import PollsList from '../../components/polls_list/polls_list';

const POLLS = [[{"company": "ICM", "client": "Sun", "method": "Online", "from": 1493769600000, "to": 1493942400000, "sample_size": 2020.0, "con": 0.46, "lab": 0.28, "ld": 0.1, "ukip": 0.08, "grn": 0.04, "snp": 0.04, "pdf": "https://www.icmunlimited.com/wp-content/uploads/2017/05/2017_sunonsunday_campaign_poll2_may7.pdf"}, {"company": "YouGov", "client": "Sunday Times", "method": "Online", "from": 1493856000000, "to": 1493942400000, "sample_size": 1644.0, "con": 0.47, "lab": 0.28, "ld": 0.11, "ukip": 0.06, "grn": 0.02, "snp": 0.05, "pdf": "https://d25d2506sfb94s.cloudfront.net/cumulus_uploads/document/mrfbguqp4r/SundayTimesResults_170505_VI_W.pdf"}, {"company": "Opinium", "client": "Observer", "method": "Online", "from": 1493683200000, "to": 1493769600000, "sample_size": 2005.0, "con": 0.46, "lab": 0.3, "ld": 0.09, "ukip": 0.07, "grn": 0.02, "snp": 0.04, "pdf": "http://opinium.co.uk/wp-content/uploads/2017/05/VI-02-05-2017-Tables-v1.xls"}, {"company": "ORB Online", "client": "Telegraph", "method": "Online", "from": 1493683200000, "to": 1493769600000, "sample_size": 1552.0, "con": 0.46, "lab": 0.31, "ld": 0.09, "ukip": 0.08, "grn": null, "snp": 0.03, "pdf": "https://www.orb-international.com/perch/resources/orb-the-telegraph-3rd-4th-may.pdf"}, {"company": "YouGov", "client": "Times", "method": "Online", "from": 1493683200000, "to": 1493769600000, "sample_size": 2066.0, "con": 0.48, "lab": 0.29, "ld": 0.1, "ukip": 0.05, "grn": 0.02, "snp": 0.04, "pdf": "http://d25d2506sfb94s.cloudfront.net/cumulus_uploads/document/dpzz1r8u3o/TimesResults_170503_VI_Trackers_with_Slogans_W.pdf"}, {"company": "Kantar TNS", "client": null, "method": "Online", "from": 1493251200000, "to": 1493683200000, "sample_size": 1205.0, "con": 0.48, "lab": 0.24, "ld": 0.11, "ukip": 0.07, "grn": 0.04, "snp": 0.04, "pdf": "http://www.tns-bmrb.co.uk/sites/tns-bmrb/files/KPUK%20Tables%20and%20Method%20Note%203.5.2017.pdf"}, {"company": "Panelbase", "client": null, "method": "Online", "from": 1493337600000, "to": 1493683200000, "sample_size": 1034.0, "con": 0.47, "lab": 0.3, "ld": 0.1, "ukip": 0.05, "grn": 0.02, "snp": 0.05, "pdf": "http://www.panelbase.com/media/polls/W10470w2TablesForPublication020517.pdf"}, {"company": "ICM Online", "client": "Guardian", "method": "Online", "from": 1493337600000, "to": 1493683200000, "sample_size": 1970.0, "con": 0.47, "lab": 0.28, "ld": 0.08, "ukip": 0.08, "grn": 0.04, "snp": 0.03, "pdf": "https://www.icmunlimited.com/wp-content/uploads/2017/05/2017_guardian_campaignpoll4_april28-02may.pdf"}, {"company": "ICM Online", "client": "Sun", "method": "Online", "from": 1493164800000, "to": 1493337600000, "sample_size": 2012.0, "con": 0.47, "lab": 0.28, "ld": 0.09, "ukip": 0.08, "grn": 0.04, "snp": 0.04, "pdf": "https://www.icmunlimited.com/wp-content/uploads/2017/05/2017_sunonsunday_camp_apr28th.pdf"}, {"company": "YouGov Online", "client": "Times", "method": "Online", "from": 1493251200000, "to": 1493337600000, "sample_size": 1612.0, "con": 0.44, "lab": 0.31, "ld": 0.11, "ukip": 0.06, "grn": 0.02, "snp": 0.04, "pdf": "http://d25d2506sfb94s.cloudfront.net/cumulus_uploads/document/zebfsayat4/SundayTimesResults_170428_W.pdf"}, {"company": "Opinium Online", "client": "Observer", "method": "Online", "from": 1493078400000, "to": 1493337600000, "sample_size": 2007.0, "con": 0.47, "lab": 0.3, "ld": 0.08, "ukip": 0.07, "grn": 0.03, "snp": 0.05, "pdf": "http://opinium.co.uk/wp-content/uploads/2017/04/VI-25-04-2017-Tables.xls"}, {"company": "ORB Online", "client": "Telegraph", "method": "Online", "from": 1493164800000, "to": 1493251200000, "sample_size": 2093.0, "con": 0.42, "lab": 0.31, "ld": 0.1, "ukip": 0.08, "grn": 0.04, "snp": 0.04, "pdf": "https://www.orb-international.com/perch/resources/orb-results-26th-27th-april-sunday.pdf"}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1493078400000, "to": 1493164800000, "sample_size": 1590.0, "con": 0.45, "lab": 0.29, "ld": 0.1, "ukip": 0.07, "grn": 0.03, "snp": 0.05, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": 1492732800000, "to": 1493078400000, "sample_size": 1004.0, "con": 0.49, "lab": 0.26, "ld": 0.13, "ukip": 0.04, "grn": 0.01, "snp": 0.04, "pdf": null}, {"company": "Panelbase Online", "client": null, "method": null, "from": 1492646400000, "to": 1492992000000, "sample_size": 1026.0, "con": 0.49, "lab": 0.27, "ld": 0.1, "ukip": 0.05, "grn": 0.03, "snp": 0.05, "pdf": null}, {"company": "Kantar TNS Online", "client": null, "method": null, "from": 1492646400000, "to": 1492992000000, "sample_size": 1196.0, "con": 0.46, "lab": 0.24, "ld": 0.11, "ukip": 0.08, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1492732800000, "to": 1492992000000, "sample_size": 2024.0, "con": 0.48, "lab": 0.27, "ld": 0.1, "ukip": 0.07, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "Norstat", "client": null, "method": null, "from": 1492646400000, "to": 1492905600000, "sample_size": 1036.0, "con": 0.42, "lab": 0.26, "ld": 0.1, "ukip": 0.08, "grn": 0.06, "snp": null, "pdf": null}, {"company": "Survation Online", "client": "Mail on Sunday", "method": null, "from": 1492732800000, "to": 1492819200000, "sample_size": 2072.0, "con": 0.4, "lab": 0.29, "ld": 0.11, "ukip": 0.11, "grn": 0.02, "snp": 0.04, "pdf": null}, {"company": "ICM Online", "client": "Peston on Sunday", "method": null, "from": 1492560000000, "to": 1492732800000, "sample_size": 2027.0, "con": 0.48, "lab": 0.26, "ld": 0.1, "ukip": 0.08, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1492646400000, "to": 1492732800000, "sample_size": 1590.0, "con": 0.48, "lab": 0.25, "ld": 0.12, "ukip": 0.05, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ORB Online", "client": "Telegraph", "method": null, "from": 1492560000000, "to": 1492646400000, "sample_size": 1860.0, "con": 0.44, "lab": 0.29, "ld": 0.08, "ukip": 0.1, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": 1492560000000, "to": 1492646400000, "sample_size": 2003.0, "con": 0.45, "lab": 0.26, "ld": 0.11, "ukip": 0.09, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "ComRes Online", "client": "Sun Mirror", "method": null, "from": 1492560000000, "to": 1492646400000, "sample_size": 2074.0, "con": 0.5, "lab": 0.25, "ld": 0.11, "ukip": 0.07, "grn": 0.03, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": null, "to": 1492560000000, "sample_size": null, "con": 0.48, "lab": 0.24, "ld": 0.12, "ukip": 0.07, "grn": 0.02, "snp": null, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1492473600000, "to": 1492473600000, "sample_size": 1000.0, "con": 0.46, "lab": 0.25, "ld": 0.11, "ukip": 0.08, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "ICM Online", "client": null, "method": null, "from": 1492128000000, "to": 1492387200000, "sample_size": 2052.0, "con": 0.44, "lab": 0.26, "ld": 0.12, "ukip": 0.11, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1491955200000, "to": 1492041600000, "sample_size": 2069.0, "con": 0.44, "lab": 0.23, "ld": 0.12, "ukip": 0.1, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": 1491868800000, "to": 1492041600000, "sample_size": 2002.0, "con": 0.38, "lab": 0.29, "ld": 0.07, "ukip": 0.14, "grn": 0.05, "snp": 0.05, "pdf": null}, {"company": "ComRes Online", "client": "Ind on Sun/Sun Mirror", "method": null, "from": 1491868800000, "to": 1492041600000, "sample_size": 2026.0, "con": 0.46, "lab": 0.25, "ld": 0.11, "ukip": 0.09, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1491350400000, "to": 1491436800000, "sample_size": 1651.0, "con": 0.42, "lab": 0.25, "ld": 0.11, "ukip": 0.11, "grn": 0.03, "snp": 0.08, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1490918400000, "to": 1491091200000, "sample_size": 2005.0, "con": 0.43, "lab": 0.25, "ld": 0.11, "ukip": 0.11, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1490486400000, "to": 1490572800000, "sample_size": 1957.0, "con": 0.43, "lab": 0.25, "ld": 0.11, "ukip": 0.1, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1489968000000, "to": 1490054400000, "sample_size": 1627.0, "con": 0.41, "lab": 0.25, "ld": 0.11, "ukip": 0.12, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1489708800000, "to": 1489881600000, "sample_size": 2012.0, "con": 0.45, "lab": 0.26, "ld": 0.09, "ukip": 0.1, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": 1489536000000, "to": 1489708800000, "sample_size": 2007.0, "con": 0.41, "lab": 0.28, "ld": 0.08, "ukip": 0.13, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ComRes Online", "client": "Ind on Sun/Sun Mirror", "method": null, "from": 1489449600000, "to": 1489708800000, "sample_size": 2026.0, "con": 0.42, "lab": 0.25, "ld": 0.12, "ukip": 0.1, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "GfK Online", "client": null, "method": null, "from": 1488326400000, "to": 1489536000000, "sample_size": 1938.0, "con": 0.41, "lab": 0.28, "ld": 0.07, "ukip": 0.12, "grn": 0.06, "snp": 0.05, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": 1489363200000, "to": 1489449600000, "sample_size": 1032.0, "con": 0.43, "lab": 0.3, "ld": 0.13, "ukip": 0.06, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1489104000000, "to": 1489449600000, "sample_size": 1631.0, "con": 0.44, "lab": 0.27, "ld": 0.1, "ukip": 0.09, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1488931200000, "to": 1489017600000, "sample_size": 1598.0, "con": 0.44, "lab": 0.25, "ld": 0.1, "ukip": 0.11, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1488499200000, "to": 1488672000000, "sample_size": 1787.0, "con": 0.44, "lab": 0.28, "ld": 0.08, "ukip": 0.11, "grn": 0.05, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1488153600000, "to": 1488240000000, "sample_size": 1666.0, "con": 0.42, "lab": 0.25, "ld": 0.11, "ukip": 0.12, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1487635200000, "to": 1487721600000, "sample_size": 2060.0, "con": 0.41, "lab": 0.25, "ld": 0.11, "ukip": 0.13, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1487289600000, "to": 1487462400000, "sample_size": 2028.0, "con": 0.44, "lab": 0.26, "ld": 0.08, "ukip": 0.13, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": 1487030400000, "to": 1487203200000, "sample_size": 2004.0, "con": 0.4, "lab": 0.27, "ld": 0.08, "ukip": 0.14, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": 1486684800000, "to": 1487030400000, "sample_size": 1014.0, "con": 0.4, "lab": 0.29, "ld": 0.13, "ukip": 0.09, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1486857600000, "to": 1486944000000, "sample_size": 2052.0, "con": 0.4, "lab": 0.24, "ld": 0.11, "ukip": 0.15, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "ComRes Online", "client": "Ind on Sun/Sun Mirror", "method": null, "from": 1486512000000, "to": 1486684800000, "sample_size": 1218.0, "con": 0.41, "lab": 0.26, "ld": 0.11, "ukip": 0.11, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1486252800000, "to": 1486339200000, "sample_size": 1984.0, "con": 0.4, "lab": 0.24, "ld": 0.11, "ukip": 0.14, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1486080000000, "to": 1486252800000, "sample_size": 1984.0, "con": 0.42, "lab": 0.27, "ld": 0.1, "ukip": 0.12, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": 1485820800000, "to": 1486080000000, "sample_size": 2005.0, "con": 0.37, "lab": 0.3, "ld": 0.08, "ukip": 0.14, "grn": 0.05, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1485734400000, "to": 1485820800000, "sample_size": 1705.0, "con": 0.4, "lab": 0.26, "ld": 0.11, "ukip": 0.12, "grn": 0.04, "snp": 0.06, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1485129600000, "to": 1485216000000, "sample_size": 1643.0, "con": 0.4, "lab": 0.24, "ld": 0.1, "ukip": 0.14, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1484870400000, "to": 1485043200000, "sample_size": 2052.0, "con": 0.42, "lab": 0.26, "ld": 0.1, "ukip": 0.13, "grn": 0.05, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1484611200000, "to": 1484697600000, "sample_size": 1654.0, "con": 0.42, "lab": 0.25, "ld": 0.11, "ukip": 0.12, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "Ipsos MORI Phone", "client": "Evening Standard", "method": null, "from": 1484265600000, "to": 1484524800000, "sample_size": 1132.0, "con": 0.43, "lab": 0.31, "ld": 0.11, "ukip": 0.06, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "Survation Online", "client": "Mail on Sunday", "method": null, "from": 1484265600000, "to": 1484265600000, "sample_size": 1177.0, "con": 0.38, "lab": 0.29, "ld": 0.1, "ukip": 0.13, "grn": 0.02, "snp": 0.04, "pdf": null}, {"company": "Opinium Online", "client": "Observer", "method": null, "from": 1484006400000, "to": 1484179200000, "sample_size": 2007.0, "con": 0.38, "lab": 0.3, "ld": 0.07, "ukip": 0.14, "grn": 0.04, "snp": 0.05, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1483920000000, "to": 1484006400000, "sample_size": 1660.0, "con": 0.39, "lab": 0.28, "ld": 0.11, "ukip": 0.13, "grn": 0.03, "snp": 0.06, "pdf": null}, {"company": "ICM Online", "client": "Guardian", "method": null, "from": 1483660800000, "to": 1483833600000, "sample_size": 2000.0, "con": 0.42, "lab": 0.28, "ld": 0.09, "ukip": 0.12, "grn": 0.04, "snp": 0.04, "pdf": null}, {"company": "YouGov Online", "client": "Times", "method": null, "from": 1483401600000, "to": 1483488000000, "sample_size": 1740.0, "con": 0.39, "lab": 0.26, "ld": 0.1, "ukip": 0.14, "grn": 0.04, "snp": 0.06, "pdf": null}], [{"date": 1483488000000, "con": 0.3954596347, "lab": 0.2608161649, "ld": 0.0978394276, "ukip": 0.1353558942, "grn": 0.0408206925}, {"date": 1483833600000, "con": 0.3929476383, "lab": 0.2768207368, "ld": 0.0991283278, "ukip": 0.1314592739, "grn": 0.036799336}, {"date": 1484006400000, "con": 0.3959456489, "lab": 0.2849909702, "ld": 0.099284373, "ukip": 0.1283659589, "grn": 0.0348723924}, {"date": 1484179200000, "con": 0.3891605024, "lab": 0.2913971333, "ld": 0.1030087657, "ukip": 0.133383812, "grn": 0.0332814656}, {"date": 1484265600000, "con": 0.3916856019, "lab": 0.2949985978, "ld": 0.1044329918, "ukip": 0.1338366506, "grn": 0.0335310188}, {"date": 1484524800000, "con": 0.412474906, "lab": 0.2662104878, "ld": 0.1075722079, "ukip": 0.1249014719, "grn": 0.0335260434}, {"date": 1484697600000, "con": 0.4219007907, "lab": 0.2557780271, "ld": 0.1078236312, "ukip": 0.1221944884, "grn": 0.0363952265}, {"date": 1485043200000, "con": 0.4116818044, "lab": 0.2500568393, "ld": 0.101961294, "ukip": 0.1320174111, "grn": 0.035492123}, {"date": 1485216000000, "con": 0.4086227852, "lab": 0.2517155837, "ld": 0.1027898348, "ukip": 0.1310953971, "grn": 0.0364873966}, {"date": 1485820800000, "con": 0.3988255984, "lab": 0.2581862332, "ld": 0.1067762729, "ukip": 0.1280750322, "grn": 0.0406852535}, {"date": 1486080000000, "con": 0.4010201488, "lab": 0.2609260169, "ld": 0.1071499935, "ukip": 0.128177944, "grn": 0.0424104611}, {"date": 1486252800000, "con": 0.4032141146, "lab": 0.2607987381, "ld": 0.1064514936, "ukip": 0.1284698658, "grn": 0.042102661}, {"date": 1486339200000, "con": 0.4045156196, "lab": 0.261244438, "ld": 0.105730595, "ukip": 0.1272983569, "grn": 0.0416876157}, {"date": 1486684800000, "con": 0.4050908598, "lab": 0.2571406921, "ld": 0.1096443154, "ukip": 0.125424662, "grn": 0.04}, {"date": 1486944000000, "con": 0.4027974679, "lab": 0.2629574017, "ld": 0.1005057761, "ukip": 0.1309284967, "grn": 0.04}, {"date": 1487030400000, "con": 0.4037074159, "lab": 0.2631061487, "ld": 0.0961465093, "ukip": 0.1322665742, "grn": 0.04}, {"date": 1487203200000, "con": 0.4091494363, "lab": 0.2654268877, "ld": 0.0869403407, "ukip": 0.1399897167, "grn": 0.04}, {"date": 1487462400000, "con": 0.4109679516, "lab": 0.2593328903, "ld": 0.0952571845, "ukip": 0.1334887638, "grn": 0.0362422596}, {"date": 1487721600000, "con": 0.4153641095, "lab": 0.2542762497, "ld": 0.1005016884, "ukip": 0.1285738703, "grn": 0.0360197003}, {"date": 1488240000000, "con": 0.4245199853, "lab": 0.2583335147, "ld": 0.1046662974, "ukip": 0.1195383626, "grn": 0.0399212677}, {"date": 1488672000000, "con": 0.4337469563, "lab": 0.2629834864, "ld": 0.1023897937, "ukip": 0.1127031408, "grn": 0.0408114011}, {"date": 1489017600000, "con": 0.4364111639, "lab": 0.272363486, "ld": 0.0987343317, "ukip": 0.1102156947, "grn": 0.0409353085}, {"date": 1489449600000, "con": 0.4252814633, "lab": 0.277747398, "ld": 0.105966642, "ukip": 0.1121233058, "grn": 0.0400080223}, {"date": 1489536000000, "con": 0.4222935865, "lab": 0.2790810014, "ld": 0.11, "ukip": 0.1138556921, "grn": 0.0417561756}, {"date": 1489708800000, "con": 0.4193358561, "lab": 0.2688665245, "ld": 0.1041938524, "ukip": 0.1120348187, "grn": 0.0390536295}, {"date": 1489881600000, "con": 0.416211729, "lab": 0.2590162849, "ld": 0.1025426556, "ukip": 0.1128447107, "grn": 0.0355972397}, {"date": 1490054400000, "con": 0.4163396824, "lab": 0.2524644983, "ld": 0.1053073127, "ukip": 0.112890828, "grn": 0.0326287205}, {"date": 1490572800000, "con": 0.4257034063, "lab": 0.2504675255, "ld": 0.1093178073, "ukip": 0.1068505181, "grn": 0.033025136}, {"date": 1491091200000, "con": 0.4263199357, "lab": 0.2503182561, "ld": 0.1095208785, "ukip": 0.1075264562, "grn": 0.0341170164}, {"date": 1491436800000, "con": 0.4253307073, "lab": 0.2515528884, "ld": 0.1077995806, "ukip": 0.1097467378, "grn": 0.0366309015}, {"date": 1492041600000, "con": 0.4257312574, "lab": 0.2572539562, "ld": 0.1005557008, "ukip": 0.1113540773, "grn": 0.0434888398}, {"date": 1492387200000, "con": 0.4432923147, "lab": 0.2568711907, "ld": 0.1183197581, "ukip": 0.103551105, "grn": 0.0411402027}, {"date": 1492473600000, "con": 0.4562724241, "lab": 0.253811999, "ld": 0.1151017426, "ukip": 0.090500965, "grn": 0.0363489294}, {"date": 1492560000000, "con": 0.4659661574, "lab": 0.2535188556, "ld": 0.1114607224, "ukip": 0.0807243324, "grn": 0.0331211493}, {"date": 1492646400000, "con": 0.4720147976, "lab": 0.2559278676, "ld": 0.1100319169, "ukip": 0.0765946155, "grn": 0.0297155873}, {"date": 1492732800000, "con": 0.4668157357, "lab": 0.2603351321, "ld": 0.1078369694, "ukip": 0.0789832262, "grn": 0.0270310255}, {"date": 1492819200000, "con": 0.4659522315, "lab": 0.2610375204, "ld": 0.1060212045, "ukip": 0.0774233667, "grn": 0.0271078318}, {"date": 1492905600000, "con": 0.4684278887, "lab": 0.2611496542, "ld": 0.1042649958, "ukip": 0.0749862544, "grn": 0.0278073561}, {"date": 1492992000000, "con": 0.4651627211, "lab": 0.2634444415, "ld": 0.1022001428, "ukip": 0.0696604458, "grn": 0.0286580972}, {"date": 1493078400000, "con": 0.4642299054, "lab": 0.273300983, "ld": 0.1012185051, "ukip": 0.0677990481, "grn": 0.0313377159}, {"date": 1493164800000, "con": 0.4580020254, "lab": 0.2850334518, "ld": 0.1002172021, "ukip": 0.0684279604, "grn": 0.0321273705}, {"date": 1493251200000, "con": 0.4549704156, "lab": 0.2953280707, "ld": 0.0976536408, "ukip": 0.071820812, "grn": 0.032721838}, {"date": 1493337600000, "con": 0.4554075601, "lab": 0.3032706897, "ld": 0.094323472, "ukip": 0.0742791788, "grn": 0.0331508213}, {"date": 1493683200000, "con": 0.467129401, "lab": 0.2873245721, "ld": 0.0967160091, "ukip": 0.0681912657, "grn": 0.0287850592}, {"date": 1493769600000, "con": 0.4675491408, "lab": 0.285256509, "ld": 0.0982339051, "ukip": 0.0680695752, "grn": 0.028353749}, {"date": 1493942400000, "con": 0.4669062266, "lab": 0.2821323758, "ld": 0.1019666734, "ukip": 0.0684440864, "grn": 0.0275115873}]];
const PARTIES = ['con', 'lab', 'ld', 'grn', 'ukip'];

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
    d3.json(elem.dataset.url, (error, data) => {
      if (error) {
        this.handleError(error);
        return;
      }

      this.polls = [[], []];

      this.polls[0] = sortBy(map(data[0], x => ({
        ...x,
        from: dateParse(x.from),
        to: dateParse(x.to)
      })), x => x.to);

      this.polls[1] = sortBy(map(data[1], x => ({
        ...x,
        date: dateParse(x.date),
      })), x => x.date);

      this.render();
    });
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
          parties={PARTIES}
          polls={this.polls[0]}
        />,
        tableElem
      );
    }
  }

  handleError(error) {
    // Clear the element
    while (this.elem.firstChild) {
      this.elem.removeChild(this.elem.firstChild);
    }

    // Add an error element
    const errElem = document.createElement('div');
    errElem.innerText = "There was an error loading the data. Retry later or in a different browser.";
    errElem.className = 'error';
    this.elem.appendChild(errElem);
  }
}
